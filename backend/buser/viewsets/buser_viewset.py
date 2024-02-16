from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from buser.models import Buser
from buser.serializers import BuserSerializer
from buser.permissions import IsUserOrReadOnly

class BuserViewSet(ModelViewSet):
    queryset = Buser.objects.all().order_by('id')
    serializer_class = BuserSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        elif self.action in ['update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsUserOrReadOnly()]
        else:
            return [IsAuthenticated()]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()  # Obter todos os usuários
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
