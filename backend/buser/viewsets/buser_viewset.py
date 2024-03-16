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
        # Retorna todos os usuários para administradores
        if self.request.user.is_staff:
            return Buser.objects.all()

        # Retorna o usuário autenticado
        return Buser.objects.filter(id=self.request.user.id)

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        elif self.action in ['update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsUserOrReadOnly()]
        else:
            return [IsAuthenticated()]

    def get_object(self):
        # Retorna o usuário autenticado ao solicitar o perfil
        if self.action == 'retrieve':
            return self.request.user

        return super().get_object()

    def perform_update(self, serializer):
        # Atualiza o perfil do usuário autenticado
        serializer.save()
