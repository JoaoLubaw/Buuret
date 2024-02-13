from django.db import models


class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=20, unique=True)
    email = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=20)
    description = models.TextField(max_length=100)
    followers = models.ManyToManyField('self', symmetrical=False, related_name='followers_set')
    following = models.ManyToManyField('self', related_name='following_set')
    background = models.ImageField(upload_to='users_backgrounds', blank=True, null=True)
    profile = models.ImageField(upload_to='users_profiles', blank=True, null=True)

    def follow(self, user):
        self.following.add(user)

    def unfollow(self, user):
        self.following.remove(user)

    def is_following(self, user):
        return self.following.filter(pk=user.pk).exists()

    def followers_count(self):
        return self.followers.count()

    def following_count(self):
        return self.following.count()

    def rets_count(self):
        return self.rets.count()

    def buus_received_count(self):
        return self.buus_received.count()