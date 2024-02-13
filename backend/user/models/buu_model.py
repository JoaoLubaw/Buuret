from django.db import models
from .user_model import User


class Buu(models.Model):
    id = models.AutoField(primary_key=True)
    sender = models.ForeignKey('User', on_delete=models.CASCADE)
    receiver = models.ForeignKey('User', on_delete=models.CASCADE, related_name='buus_received')
    content = models.TextField(max_length=100)
