from django.db import models
from .buser_model import Buser


class Ret(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(Buser, on_delete=models.CASCADE, related_name='rets')
    likes = models.ManyToManyField(Buser, related_name='liked', blank=True)
    datetime = models.DateTimeField(auto_now_add=True)
    content = models.TextField(max_length=300)
    media = models.ImageField(upload_to='ret_media', blank=True, null=True)
    comret = models.BooleanField(default=False)
    replyto = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='replies')
    rerets = models.ManyToManyField(Buser, related_name='rerets', blank=True)
    isreret = models.BooleanField(default=False)
    refbuu = models.ForeignKey('buser.Buu', on_delete=models.SET_NULL, null=True, blank=True, related_name='ret_responses')

    def make_reret(self, user, reret_by=None):
        """
        Método para realizar um reret (retweet).
        Cria um novo ret (reret) baseado no ret original, mantendo a autoria do usuário que faz o reret.
        """
        if not self.isreret:  # Verificar se este retweet ainda não é um reret
            reret = Ret.objects.create(
                user=user,  # Definir o usuário que fez o reret como autor
                content=self.content,  # Copiar o conteúdo do ret original
                media=self.media,  # Copiar a mídia, se houver
                comret=True,  # Definir como um reret
                replyto=self,  # Definir o ret original como o ret a ser retweetado
                reret_by=reret_by  # Definir quem fez o reret
            )
            reret.save()
            self.isreret = True
            self.save()
            self.rerets.add(user)
            return True
        else:
            return False  # Retorno False se já for um reret

    def likes_count(self):
        return self.likes.count()

    def reret_count(self):
        return self.rerets.count()

    def replies_count(self):
        return self.replies.count()
