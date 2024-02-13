from django.urls import path, include
from rest_framework.routers import DefaultRouter
from user.viewsets import UserViewSet, RetViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'rets', RetViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
