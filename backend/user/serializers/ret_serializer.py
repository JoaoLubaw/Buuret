from rest_framework import serializers
from user.models import Ret


class RetSerializer(serializers.ModelSerializer):
    likes_count = serializers.ReadOnlyField(source='likes_count')
    reret_count = serializers.ReadOnlyField(source='reret_count')
    replies_count = serializers.ReadOnlyField(source='replies_count')

    class Meta:
        model = Ret
        fields = ['id', 'user', 'likes', 'datetime', 'content', 'media', 'comret', 'replies', 'rerets',
                  'isreret', 'refbuu']
