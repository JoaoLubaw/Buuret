from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from buser.models import Ret, Buser
from buser.serializers import RetSerializer

@api_view(['GET'])
def user_rets(request, username):
    try:
        # Recuperar o usuário com base no nome de usuário fornecido
        user = Buser.objects.get(username=username)

        # Filtrar os rets pelo usuário específico
        user_rets = Ret.objects.filter(user=user)

        # Filtrar os rets dos rereteds do usuário
        rereted_rets = Ret.objects.filter(rereteds=user)

        # Combinar os rets do usuário e dos rereteds
        all_user_rets = user_rets | rereted_rets

        # Serializar os rets e retornar a resposta
        serializer = RetSerializer(all_user_rets, many=True)
        return Response(serializer.data)
    except Buser.DoesNotExist:
        return Response({'message': 'O usuário não existe'}, status=status.HTTP_404_NOT_FOUND)
