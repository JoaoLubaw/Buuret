from django.db import models
from django.contrib.auth.models import AbstractUser


class Buser(AbstractUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=20, unique=True)
    email = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    birthdate = models.CharField(max_length=10)
    telephone = models.CharField(max_length=20, blank=True, null=True)
    password = models.CharField(max_length=20)
    description = models.TextField(max_length=100, blank=True)
    followers = models.ManyToManyField('self', symmetrical=False, related_name='followers_set', blank=True, default=[])
    following = models.ManyToManyField('self', related_name='following_set', blank=True, default=[])
    background = models.ImageField(upload_to='busers_backgrounds', blank=True, null=True)
    profile = models.ImageField(upload_to='busers_profiles', blank=True, null=True)


    def follow(self, buser):
        self.following.add(buser)

    def unfollow(self, buser):
        self.following.remove(buser)

    def is_following(self, buser):
        return self.following.filter(pk=buser.pk).exists()

    def followers_count(self):
        return self.followers.count()

    def following_count(self):
        return self.following.count()

    def rets_count(self):
        return self.rets.count()

    def buus_received_count(self):
        return self.buus_received.count()