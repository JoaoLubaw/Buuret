from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from buser.models import Buser
from buser.serializers import BuserSerializer
from rest_framework import permissions
import random


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


class BuserViewSet(ModelViewSet):
    serializer_class = BuserSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'username'

    def get_queryset(self):
        username = self.kwargs.get('username', None)
        if username is not None:
            return Buser.objects.filter(username=username)
        else:
            if self.request.user.is_staff:
                return Buser.objects.all()
            else:
                return Buser.objects.none()

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        elif self.action in ['update', 'partial_update', 'destroy', 'follow', 'unfollow']:
            return [IsFollowingOrReadOnly()]
        else:
            return [IsAuthenticated()]

    def perform_update(self, serializer):
        serializer.save()

    def follow(self, request, *args, **kwargs):
        user_to_follow = self.get_object()
        logged_buser = request.user
        if user_to_follow != logged_buser and not logged_buser.is_following(user_to_follow):
            logged_buser.following.add(user_to_follow)  # Adicionar o usuário autenticado aos seguintes do usuário alvo
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
        all_users = Buser.objects.all()

        # Embaralhar a lista de usuários
        random.shuffle(all_users)

        # Limitar a lista aos primeiros 10 usuários (ou menos, se houver menos de 10)
        suggested_users = all_users[:3]

        serializer = self.get_serializer(suggested_users, many=True)
        return Response(serializer.data)
