from django.db import models


class User(models.Model):
    id = models.AutoField
    username = models.CharField(max_length=20, unique=True, primary_key=True)
    email = models.CharField
    password = models.CharField(max_length=20)
    description = models.TextField(max_length=100)
    followers = models.ManyToManyField('self', symmetrical=False, related_name='following')
    following = models.ManyToManyField('self', related_name='followers')
    background = models.ImageField(upload_to='users_backgrounds', blank=True, null=True)
    profile =  models.ImageField(upload_to='users_profiles', blank=True, null=True)

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


class Ret(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rets')
    likes = models.ManyToManyField(User, related_name='liked')
    datetime = models.DateTimeField(auto_now_add=True)
    content = models.TextField(max_length=300)
    media = models.ImageField(upload_to='ret_media', blank=True, null=True)
    comret = models.BooleanField(default=False)
    replies = models.ManyToManyField('self', symmetrical=False, related_name='replyto', blank=True)
    rerets = models.ManyToManyField(User, related_name='rerets', blank=True)
    isreret = models.BooleanField(default=False)

    def likes_count(self):
        return self.likes.count()

    def reret_count(self):
        return self.rerets.count()

    def replies_count(self):
        return self.replies.count()


class Buu(models.Model):
    id = models.AutoField(primary_key=True),
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    sendTo = models.ForeignKey(User, on_delete=models.CASCADE, related_name='buus')
    content = models.TextField(max_length=100)
