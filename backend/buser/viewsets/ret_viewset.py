from rest_framework.viewsets import ModelViewSet
from buser.models import Ret
from buser.serializers import RetSerializer

class RetViewSet(ModelViewSet):
    serializer_class = RetSerializer
    queryset = Ret.objects.all()