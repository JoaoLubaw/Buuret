"""
URL configuration for buuretApi project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import debug_toolbar
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from buser import views
from buser.viewsets import BuserViewSet, RetViewSet, BuuViewSet, user_rets
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'busers', BuserViewSet, basename='buser')
router.register(r'rets', RetViewSet)
router.register(r'buus', BuuViewSet, basename='buus')

urlpatterns = [
    path("admin/", admin.site.urls),
    path('__debug__/', include(debug_toolbar.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('busers/sugg/', BuserViewSet.as_view({'get': 'suggested_users'}), name='suggested-users'),
    path('busers/<str:username>/', BuserViewSet.as_view({'get': 'retrieve', 'put': 'update'}), name='buser-detail'),
    path('busers/<str:username>/follow/', BuserViewSet.as_view({'post': 'follow'}), name='follow-user'),  # Rota para seguir um usuário
    path('busers/<str:username>/unfollow/', BuserViewSet.as_view({'post': 'unfollow'}), name='unfollow-user'),  # Rota para parar de seguir um usuário
    path('rets/user/<str:username>/', user_rets, name='user-rets'),
    path("update_server/", views.update, name="update"),
    path('', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
