from rest_framework import serializers
from user.models import Buu


class BuuSerializer(serializers.ModelSerializer):

    class Meta:
        model = Buu
        fields = ['id', 'user', 'sendTo', 'content']
