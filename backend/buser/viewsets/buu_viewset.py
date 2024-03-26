from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from buser.models import Buu
from buser.serializers import BuuSerializer

class BuuViewSet(viewsets.ModelViewSet):
    serializer_class = BuuSerializer

    def get_queryset(self):
        # Obtém o usuário autenticado
        user = self.request.user

        # Filtra os Buus pelo receiver igual ao usuário autenticado
        queryset = Buu.objects.filter(receiver=user)

        return queryset
