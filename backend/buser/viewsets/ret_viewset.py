from rest_framework.viewsets import ModelViewSet
from user.models import Ret
from user.serializers import RetSerializer

class RetViewSet(ModelViewSet):
    serializer_class = RetSerializer
    queryset = Ret.objects.all()