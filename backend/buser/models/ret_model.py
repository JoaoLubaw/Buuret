from django.db import models
from .buser_model import Buser


class Ret(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(Buser, on_delete=models.CASCADE, related_name='rets')
    likes = models.ManyToManyField(Buser, related_name='liked')
    datetime = models.DateTimeField(auto_now_add=True)
    content = models.TextField(max_length=300)
    media = models.ImageField(upload_to='ret_media', blank=True, null=True)
    comret = models.BooleanField(default=False)
    replies = models.ManyToManyField('self', symmetrical=False, related_name='replyto', blank=True)
    rerets = models.ManyToManyField(Buser, related_name='rerets', blank=True)
    isreret = models.BooleanField(default=False)
    refbuu = models.ForeignKey('buser.Buu', on_delete=models.SET_NULL, null=True, blank=True, related_name='ret_responses')

    def likes_count(self):
        return self.likes.count()

    def reret_count(self):
        return self.rerets.count()

    def replies_count(self):
        return self.replies.count()