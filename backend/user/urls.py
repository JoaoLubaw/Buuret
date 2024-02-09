from django.urls import path, include
from rest_framework import routers

from user import viewsets

router = routers.SimpleRouter()
router.register(r'user', viewsets.user_viewset, basename='user')

urlpatterns = [
    path('', include(router.urls))
]
