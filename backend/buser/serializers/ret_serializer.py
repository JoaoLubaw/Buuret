from rest_framework import serializers
from user.models import Ret


class RetSerializer(serializers.ModelSerializer):
    likes_count = serializers.ReadOnlyField()
    reret_count = serializers.ReadOnlyField()
    replies_count = serializers.ReadOnlyField()

    class Meta:
        model = Ret
        fields = ['id', 'user', 'likes', 'datetime', 'content', 'media', 'comret', 'replies', 'rerets',
                  'isreret', 'refbuu', 'reret_count', 'likes_count', 'replies_count']
