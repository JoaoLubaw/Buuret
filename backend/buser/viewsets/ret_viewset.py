from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from buser.models import Ret
from buser.serializers import RetSerializer


class RetViewSet(ModelViewSet):
    serializer_class = RetSerializer
    queryset = Ret.objects.all()

    @action(detail=False, methods=['get'])
    def timeline(self, request):
        # Recuperar os rets do usuário logado
        user_rets = Ret.objects.filter(user=request.user)

        # Recuperar os rets dos usuários seguidos
        following_users = request.user.following.all()
        following_rets = Ret.objects.filter(user__in=following_users)

        # Combinar e ordenar os rets
        timeline = sorted(list(user_rets) + list(following_rets), key=lambda ret: ret.datetime, reverse=True)

        # Serializar os rets e retornar a timeline
        serializer = self.get_serializer(timeline, many=True)
        return Response(serializer.data)
