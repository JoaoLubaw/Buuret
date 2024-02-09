from django.db import models
from user.models import User


class Buu(models.Model):
    id = models.AutoField(primary_key=True),
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    sendTo = models.ForeignKey(User, on_delete=models.CASCADE, related_name='buus')
    content = models.TextField(max_length=100)
