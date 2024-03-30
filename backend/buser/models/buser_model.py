from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password


class Buser(AbstractUser):
    name = models.CharField(max_length=100)
    birthdate = models.CharField(max_length=10)
    telephone = models.CharField(max_length=20, blank=True, null=True)
    description = models.TextField(max_length=100, blank=True)
    followers = models.ManyToManyField('self', symmetrical=False, related_name='followers_set', blank=True, default=[])
    following = models.ManyToManyField('self', symmetrical=False, related_name='following_set', blank=True, default=[])
    background = models.ImageField(upload_to='busers_backgrounds', blank=True, null=True)
    profile = models.ImageField(upload_to='busers_profiles', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    rereteds = models.ManyToManyField('Ret', related_name='rereteds_users', blank=True)

    def save(self, *args, **kwargs):
        if self.password and not self.pk:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def follow(self, buser):
        self.following.add(buser)
        self.save()  # Salvar o objeto para persistir a mudança no banco de dados

    def unfollow(self, buser):
        self.following.remove(buser)
        self.save()  # Salvar o objeto para persistir a mudança no banco de dados

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

    @property
    def following_usernames(self):
        # Retorna uma lista de usernames dos usuários seguidos
        return list(
            Buser.objects.filter(id__in=self.following.values_list('id', flat=True)).values_list('username', flat=True))