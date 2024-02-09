from rest_framework import serializers
from user.models import User


class UserSerializer(serializers.ModelSerializer):
    followers_count = serializers.ReadOnlyField(source='followers_count')
    following_count = serializers.ReadOnlyField(source='following_count')
    rets_count = serializers.ReadOnlyField(source='rets_count')

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'description', 'followers', 'following', 'background', 'profile',
                  'followers_count', 'following_count', 'rets_count', 'rets', 'buus', 'liked']
