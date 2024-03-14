from rest_framework import serializers
from buser.models import Buser

class BuserSerializer(serializers.ModelSerializer):
    followers_count = serializers.ReadOnlyField
    following_count = serializers.ReadOnlyField
    buus_received_count = serializers.ReadOnlyField
    rets_count = serializers.ReadOnlyField()

    class Meta:
        model = Buser
        fields = ['id', 'username', 'email', 'name', 'birthdate', 'telephone', 'description',
                  'followers_count', 'following_count', 'rets_count', 'buus_received_count', 'password']
