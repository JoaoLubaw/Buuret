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

    def get_queryset(self):
        token_user = self.request.user
        return Buser.objects.filter(id=token_user.id)


    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        elif self.action in ['update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsUserOrReadOnly()]
        else:
            return [IsAuthenticated()]
