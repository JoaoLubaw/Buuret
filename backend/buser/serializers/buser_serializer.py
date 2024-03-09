from rest_framework import serializers
from buser.models import Buser

class BuserSerializer(serializers.ModelSerializer):
    followers_count = serializers.ReadOnlyField(source='followers.count')
    following_count = serializers.ReadOnlyField(source='following.count')
    rets_count = serializers.ReadOnlyField(source='rets_count')
    buus_received_count = serializers.ReadOnlyField(source='buus_received_count')

    class Meta:
        model = Buser
<<<<<<< HEAD
        fields = ['id', 'username', 'password', 'email', 'birthdate', 'telephone', 'name', 'description', 'followers', 'following', 'background', 'profile',
                  'followers_count', 'following_count', 'rets_count', 'rets', 'buus_received', 'liked', 'buus_received_count']
=======
        fields = ['id', 'username', 'email', 'name', 'birthdate', 'telephone', 'description',
                  'followers_count', 'following_count', 'rets_count', 'buus_received_count']
>>>>>>> c32869fc9c55c82b406381a79fd6abc829b1b9aa
