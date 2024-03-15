from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from buser.models import Buser
from buser.serializers import BuserSerializer
from buser.permissions import IsUserOrReadOnly
from rest_framework import permissions


class BuserViewSet(ModelViewSet):
    serializer_class = BuserSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'username'  # Especifica que o campo 'username' será usado para buscar na URL

    def get_queryset(self):
        username = self.kwargs.get('username')  # Pega o username da URL, se existir
        id = self.kwargs.get('id')  # Pega o id da URL, se existir

        if username:  # Se username estiver presente na URL, filtra por username
            return Buser.objects.filter(username=username)

        if id:  # Se id estiver presente na URL, filtra por id
            return Buser.objects.filter(id=id)

        # Caso contrário, retorna o usuário associado ao token
        token_user = self.request.user
        return Buser.objects.filter(id=token_user.id)

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        elif self.action in ['update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsUserOrReadOnly()]
        else:
            return [IsAuthenticated()]
