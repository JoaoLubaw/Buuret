import random
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from buser.models import Buser
from buser.serializers import BuserSerializer
from buser.permissions import IsUserOrReadOnly


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
            return [IsAuthenticated(), IsUserOrReadOnly()]
        else:
            return [IsAuthenticated()]

    def perform_update(self, serializer):
        serializer.save()

    def follow(self, request, *args, **kwargs):
        user_to_follow = self.get_object()
        if user_to_follow != request.user:  # Verificar se não está seguindo a si mesmo
            request.user.following.add(user_to_follow)
            return Response({'message': f'Você está seguindo {user_to_follow.username} agora.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Você não pode seguir a si mesmo.'}, status=status.HTTP_400_BAD_REQUEST)

    def unfollow(self, request, *args, **kwargs):
        user_to_unfollow = self.get_object()
        request.user.following.remove(user_to_unfollow)
        return Response({'message': f'Você não está mais seguindo {user_to_unfollow.username}.'}, status=status.HTTP_200_OK)

    def suggested_users(self, request):
        # Obter todos os usuários
        all_users = Buser.objects.all()

        # Embaralhar a lista de usuários
        random.shuffle(all_users)

        # Limitar a lista aos primeiros 10 usuários (ou menos, se houver menos de 10)
        suggested_users = all_users[:3]

        serializer = self.get_serializer(suggested_users, many=True)
        return Response(serializer.data)
