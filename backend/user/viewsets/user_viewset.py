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

    from django.contrib.auth.models import User

    def list(self, request, *args, **kwargs):
        logger.debug(f"Request user: {request.user}")
        user = request.user
        if isinstance(user, User):
            user_instance = user
        else:
            # Se o usuário autenticado não for um objeto User válido, retorne uma resposta de erro
            return Response({"detail": "Autenticação inválida."}, status=status.HTTP_401_UNAUTHORIZED)
        serializer = self.get_serializer(user_instance)
        buus_received = Buu.objects.filter(receiver=user_instance)
        buus_serializer = BuuSerializer(buus_received, many=True)
        rets = Ret.objects.filter(buu__in=buus_received)
        rets_serializer = RetSerializer(rets, many=True)
        serialized_data = serializer.data
        serialized_data['buus'] = buus_serializer.data
        serialized_data['rets'] = rets_serializer.data
        return Response(serialized_data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

