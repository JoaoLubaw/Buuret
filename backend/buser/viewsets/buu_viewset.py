from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from buser.models import Buu
from buser.serializers import BuuSerializer

class BuuViewSet(viewsets.ModelViewSet):
    queryset = Buu.objects.all()
    serializer_class = BuuSerializer
