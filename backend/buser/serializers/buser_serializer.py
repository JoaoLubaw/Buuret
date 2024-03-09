from rest_framework import serializers
from buser.models import Buser

class BuserSerializer(serializers.ModelSerializer):
    followers_count = serializers.ReadOnlyField()
    following_count = serializers.ReadOnlyField()
    rets_count = serializers.ReadOnlyField()
    buus_received_count = serializers.ReadOnlyField()

    class Meta:
        model = Buser
        fields = ['id', 'username', 'password', 'email', 'birthdate', 'telephone', 'name',  'description', 'followers', 'following', 'background', 'profile',
                  'followers_count', 'following_count', 'rets_count', 'rets', 'buus_received', 'liked', 'buus_received_count']
