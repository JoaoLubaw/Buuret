from django.db import models
from .buser_model import Buser


class Buu(models.Model):
    id = models.AutoField(primary_key=True)
    sender = models.ForeignKey(Buser, on_delete=models.CASCADE)
    receiver = models.ForeignKey(Buser, on_delete=models.CASCADE, related_name='buus_received')
    content = models.TextField(max_length=100)
    opened = models.BooleanField()