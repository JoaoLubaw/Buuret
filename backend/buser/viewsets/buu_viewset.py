from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from buser.models import Buu
from buser.serializers import BuuSerializer

class BuuViewSet(viewsets.ModelViewSet):
    serializer_class = BuuSerializer

    def get_queryset(self):
        if self.action == 'retrieve':
            return Buu.objects.all()  # Retorna todos os Buus para solicitações de detalhes individuais
        else:
            # Filtra os Buus pelo receiver igual ao usuário autenticado
            user = self.request.user
            return Buu.objects.filter(receiver=user)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
