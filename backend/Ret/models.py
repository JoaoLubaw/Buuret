from django.db import models

class Ret(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=500, blank=True, null=True)
    price = models.PositiveIntegerField(null=True)
    active = models.BooleanField(default=True)
    category = models.ManyToManyField(Category, blank=True)
    objects = models.Manager()  # Adicione esta linha para definir o gerenciador de objetos


