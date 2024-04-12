from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from buser.models import Buser
from buser.serializers import BuserSerializer
from rest_framework import permissions
from django.db.models import Q
from rest_framework import filters


class IsFollowingOrReadOnly(permissions.BasePermission):
    """
    Permissão personalizada para seguir usuários.
    """

    def has_permission(self, request, view):
        # Verificar se o usuário está autenticado para seguir outro usuário
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Verificar se o usuário está tentando seguir a si mesmo
        return obj != request.user


class IsSelfOrReadOnly(permissions.BasePermission):
    """
    Permissão personalizada que permite que um usuário edite apenas o próprio perfil.
    """

    def has_object_permission(self, request, view, obj):
        # Permite que usuários autenticados editem seus próprios perfis
        return obj == request.user


class BuserViewSet(ModelViewSet):
    serializer_class = BuserSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'username'

    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'name']

    def get_queryset(self):
        username = self.kwargs.get('username', None)
        if username is not None:
            return Buser.objects.filter(username=username)
        elif self.request.user.is_authenticated:
            return Buser.objects.all()
        else:
            return Buser.objects.none()

    @action(detail=False, methods=['get'])
    def search(self, request):
        query = request.query_params.get('q', '')
        queryset = self.filter_queryset(self.get_queryset())

        # Aplicar filtro de pesquisa aos campos especificados
        queryset = queryset.filter(Q(username__icontains=query) | Q(name__icontains=query))

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        elif self.action in ['update', 'partial_update', 'destroy']:
            return [IsSelfOrReadOnly()]
        elif self.action in ['follow', 'unfollow']:
            return [IsFollowingOrReadOnly()]
        else:
            return [IsAuthenticated()]

    def perform_update(self, serializer):
        serializer.save()

    def follow(self, request, *args, **kwargs):
        user_to_follow = self.get_object()
        logged_buser = request.user
        if user_to_follow != logged_buser and not logged_buser.is_following(user_to_follow):
            logged_buser.following.add(user_to_follow)  # Adicionar o usuário autenticado aos seguidores do usuário alvo
            user_to_follow.followers.add(logged_buser)  # Adicionar o usuário autenticado aos seguidores do usuário alvo
            user_to_follow.save()  # Salvar as mudanças no usuário alvo
            logged_buser.save()
            return Response({'message': f'Você está seguindo {user_to_follow.username} agora.'},
                            status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Você não pode seguir a si mesmo ou já está seguindo este usuário.'},
                            status=status.HTTP_400_BAD_REQUEST)

    def unfollow(self, request, *args, **kwargs):
        user_to_unfollow = self.get_object()
        logged_buser = request.user
        if user_to_unfollow != logged_buser:
            logged_buser.following.remove(user_to_unfollow)
            user_to_unfollow.followers.remove(logged_buser)
            user_to_unfollow.save()
            logged_buser.save()
            return Response({'message': f'Você não está mais seguindo {user_to_unfollow.username}.'},
                            status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Você não pode deixar de seguir a si mesmo.'},
                            status=status.HTTP_400_BAD_REQUEST)

    def suggested_users(self, request):
        # Obter todos os usuários
        logged_buser = request.user

        # Obter todos os usuários excluindo o usuário logado e os usuários seguidos pelo usuário logado
        suggested_users = Buser.objects.exclude(
            Q(id=logged_buser.id) | Q(followers=logged_buser)
        ).order_by('?')[:4]  # Ordenar aleatoriamente e pegar os primeiros 4

        serializer = self.get_serializer(suggested_users, many=True)
        return Response(serializer.data)
