from rest_framework import serializers
from buser.models import Buser
from buser.serializers import BuuSerializer
from buser.serializers import RetSerializer
from django.contrib.auth.hashers import make_password


class BuserSerializer(serializers.ModelSerializer):
    followers_count = serializers.ReadOnlyField()
    following_count = serializers.ReadOnlyField()
    buus_received_count = serializers.ReadOnlyField()
    rets_count = serializers.ReadOnlyField()
    rets = RetSerializer(many=True, read_only=True)
    buus_received = BuuSerializer(many=True, read_only=True)
    following = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

    class Meta:
        model = Buser
        fields = ['id', 'username', 'email', 'name', 'birthdate', 'telephone', 'description',
                  'followers_count', 'following_count', 'rets_count', 'buus_received_count', 'password', 'rets',
                  'buus_received', 'following', 'followers', 'is_active', 'profile', 'background']

    def get_following(self, obj):
        return obj.following.values_list('id', flat=True)

    def get_followers(self, obj):
        return obj.followers.values_list('id', flat=True)
