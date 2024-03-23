from rest_framework import serializers
from buser.models import Ret
from buser.serializers import BuserSerializer
from buser.serializers import BuuSerializer

class RetSerializer(serializers.ModelSerializer):
    likes_count = serializers.ReadOnlyField()
    reret_count = serializers.ReadOnlyField()
    replies_count = serializers.ReadOnlyField()
    user = BuserSerializer()  # Incluir todos os campos do Buser
    refbuu = BuuSerializer()  # Incluir todos os campos do Buser

    class Meta:
        model = Ret
        fields = ['id', 'user', 'likes', 'datetime', 'content', 'media', 'comret', 'replies', 'rerets',
                  'isreret', 'refbuu', 'reret_count', 'likes_count', 'replies_count', 'replyto']
