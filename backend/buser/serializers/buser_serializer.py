from rest_framework import serializers
from buser.models import Buser, Buu, Ret

class BuserSerializer(serializers.ModelSerializer):
    followers_count = serializers.ReadOnlyField()
    following_count = serializers.ReadOnlyField()
    buus_received_count = serializers.ReadOnlyField()
    rets_count = serializers.ReadOnlyField()
    rets = 'RetSerializer'
    buus_received = 'BuuSerializer'
    following = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()
    following_usernames = serializers.ReadOnlyField()


    class Meta:
        model = Buser
        fields = ['id', 'username', 'email', 'name', 'birthdate', 'telephone', 'description',
                  'followers_count', 'following_count', 'rets_count', 'buus_received_count', 'password', 'rets',
                  'buus_received', 'following', 'followers', 'is_active', 'profile', 'background', 'following_usernames']

    def get_following(self, obj):
        return obj.following.values_list('id', flat=True)

    def get_followers(self, obj):
        return obj.followers.values_list('id', flat=True)

class BuuSerializer(serializers.ModelSerializer):
    sender = serializers.PrimaryKeyRelatedField(queryset=Buser.objects.all())
    receiver = serializers.PrimaryKeyRelatedField(queryset=Buser.objects.all())

    class Meta:
        model = Buu
        fields = ['id', 'sender', 'receiver', 'content', 'opened']

class RetSerializer(serializers.ModelSerializer):
    likes_count = serializers.ReadOnlyField()
    reret_count = serializers.ReadOnlyField()
    replies_count = serializers.ReadOnlyField()
    user = BuserSerializer(read_only=True)
    refbuu = serializers.PrimaryKeyRelatedField(queryset=Buu.objects.all(), allow_null=True, required=False)
    replies = serializers.SerializerMethodField()
    reret_by = serializers.SerializerMethodField()  # Corrigido para representar os busers que fizeram reret

    def get_replies(self, obj):
        replies = Ret.objects.filter(replyto=obj)
        serializer = self.__class__(replies, many=True)
        return serializer.data

    def get_reret_by(self, obj):
        if obj.rerets.exists():
            return obj.rerets.values_list('username', flat=True)
        else:
            return []

    class Meta:
        model = Ret
        fields = ['id', 'user', 'likes', 'datetime', 'content', 'media', 'comret', 'replies', 'rerets', 'refbuu', 'reret_count', 'likes_count', 'replies_count', 'replyto', 'reret_by']


