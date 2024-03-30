from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from buser.models import Ret, Buser
from buser.serializers import RetSerializer

class RetViewSet(ModelViewSet):
    serializer_class = RetSerializer
    queryset = Ret.objects.all()

    @action(detail=False, methods=['get'])
    def timeline(self, request):
        user = request.user

        # Recuperar os rets do usuário logado
        user_rets = Ret.objects.filter(user=user)

        # Recuperar os rets dos usuários seguidos
        following_users = user.following.all()
        following_rets = Ret.objects.filter(user__in=following_users)

        # Recuperar os rereteds dos usuários seguidos
        following_rereteds = Ret.objects.filter(rerets__in=following_users).exclude(user=user)

        # Combinar rets, rereteds e ordenar pela data
        timeline = sorted(list(user_rets) + list(following_rets) + list(following_rereteds),
                          key=lambda ret: ret.datetime, reverse=True)

        # Serializar os rets e retornar a timeline
        serializer = self.get_serializer(timeline, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        # Associar o usuário logado ao Ret sendo criado
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        ret = self.get_object()
        user = request.user

        if user in ret.likes.all():
            ret.likes.remove(user)
            return Response({'message': 'Post unliked successfully.'}, status=status.HTTP_200_OK)
        else:
            ret.likes.add(user)
            return Response({'message': 'Post liked successfully.'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def reret(self, request, pk=None):
        ret = self.get_object()
        user = request.user

        # Verificar se o usuário já reretweetou o ret
        if ret.rerets.filter(pk=user.pk).exists():
            return Response({'message': 'Você já fez reret deste ret.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Realizar o reret
            user.rerets.add(ret)  # Adiciona o ret à lista de rerets do usuário
            ret.rereted.add(user)  # Adiciona o usuário à lista de rereted do ret original
            user.save()
            ret.save()
            return Response({'message': 'Reret realizado com sucesso.'}, status=status.HTTP_200_OK)
