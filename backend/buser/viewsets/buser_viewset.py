from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from user.models import Buser, Buu, Ret
from user.serializers import BuserSerializer, BuuSerializer, RetSerializer
from user.permissions import IsUserOrReadOnly

class BuserViewSet(ModelViewSet):
    queryset = Buser.objects.all().order_by('id')
    serializer_class = BuserSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        elif self.action in ['update', 'partial_update']:
            return [IsAuthenticated(), IsUserOrReadOnly()]
        else:
            return [IsAuthenticated()]

    def list(self, request, *args, **kwargs):
        user_instance = request.user
        serializer = self.get_serializer(user_instance)
        buus_received = Buu.objects.filter(receiver=user_instance)
        buus_serializer = BuuSerializer(buus_received, many=True)
        rets = Ret.objects.filter(buu__in=buus_received)
        rets_serializer = RetSerializer(rets, many=True)
        serialized_data = serializer.data
        serialized_data['buus'] = buus_serializer.data
        serialized_data['rets'] = rets_serializer.data
        return Response(serialized_data, status=status.HTTP_200_OK)
