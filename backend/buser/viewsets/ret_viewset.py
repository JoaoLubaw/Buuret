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

        # Recuperar os rerets do usuário logado
        user_rerets = user.rereteds.all()

        # Recuperar os rerets dos usuários seguidos
        following_users = user.following.all()
        following_rerets = Ret.objects.filter(rerets__in=following_users).exclude(user=user)

        # Combine os rets normais e os rerets em uma única lista
        all_rets = list(user_rerets) + list(following_rerets)

        # Criar um dicionário para armazenar os rets com mais rerets
        rets_with_most_rerets = {}

        # Iterar sobre os rets e adicionar aqueles com mais rerets ao dicionário
        for ret in all_rets:
            if ret.id not in rets_with_most_rerets or len(ret.rerets.all()) > len(
                    rets_with_most_rerets[ret.id].rerets.all()):
                rets_with_most_rerets[ret.id] = ret

        # Filtrar os rets que não são respostas a outros rets
        filtered_rets = [ret for ret in rets_with_most_rerets.values() if ret.replyto is None]

        # Ordenar os rets filtrados por data
        timeline = sorted(filtered_rets, key=lambda ret: ret.datetime, reverse=True)

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
            # Remover o usuário da lista de rereteds do ret
            ret.rerets.remove(user)
            # Remover o ret da lista de rereteds do usuário
            user.rereteds.remove(ret)
            return Response({'message': 'Reret desfeito com sucesso.'}, status=status.HTTP_200_OK)
        else:
            # Realizar o reret
            ret.rerets.add(user)  # Adiciona o usuário à lista de rerets do ret
            ret.save()  # Salva o ret
            # Adicionar o ret à lista de rereteds do usuário
            user.rereteds.add(ret)
            user.save()  # Salva o usuário
            return Response({'message': 'Reret realizado com sucesso.'}, status=status.HTTP_200_OK)