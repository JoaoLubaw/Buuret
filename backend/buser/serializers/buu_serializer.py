from rest_framework import serializers
from buser.models import Buu, Buser

class BuuSerializer(serializers.ModelSerializer):
    sender = serializers.PrimaryKeyRelatedField(queryset=Buser.objects.all())
    receiver = serializers.PrimaryKeyRelatedField(queryset=Buser.objects.all())

    class Meta:
        model = Buu
        fields = ['id', 'sender', 'receiver', 'content', 'opened']
