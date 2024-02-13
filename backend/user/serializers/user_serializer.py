from rest_framework import serializers
from user.models import User

class UserSerializer(serializers.ModelSerializer):
    followers_count = serializers.ReadOnlyField()
    following_count = serializers.ReadOnlyField()
    rets_count = serializers.ReadOnlyField()
    buus_received_count = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'description', 'followers', 'following', 'background', 'profile',
                  'followers_count', 'following_count', 'rets_count', 'rets', 'buus_received', 'liked', 'buus_received_count']
