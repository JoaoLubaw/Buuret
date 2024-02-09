from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from user.models import User, Buu, Ret
from user.serializers import UserSerializer, BuuSerializer, RetSerializer
import logging

logger = logging.getLogger(__name__)


class UserViewSet(ModelViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    queryset = User.objects.all().order_by('id')

    def list(self, request, *args, **kwargs):
        logger.debug(f"Request user: {request.user}")

        # Get the requested user
        user = request.user

        # Serialize the user data
        serializer = self.get_serializer(user)

        # Include buus received by the user in the response
        buus_received = user.buus_received.all()
        buus_serializer = BuuSerializer(buus_received, many=True)

        # Include rets associated with buus in the response
        rets = Ret.objects.filter(buu__in=buus_received)
        rets_serializer = RetSerializer(rets, many=True)

        # Add buus data and associated rets to the serialized user data
        serialized_data = serializer.data
        serialized_data['buus'] = buus_serializer.data
        serialized_data['rets'] = rets_serializer.data

        # Return the combined data in the response
        return Response(serialized_data, status=status.HTTP_200_OK)
