from django.urls import path
from . import views


urlpatterns = [
    path("", views.getRoutes),
    path("login/", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
]
