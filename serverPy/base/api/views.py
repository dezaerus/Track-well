from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import check_password 
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import login as django_login  # Rename to avoid conflicts
from ..models import CustomUser
from .serializers import UserSerializer
from django.views.decorators.csrf import csrf_exempt

@api_view(["POST"])
def register(request):
    data = request.data
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return Response(
            {"msg": "Please fill all fields."}, status=status.HTTP_400_BAD_REQUEST
        )

    if CustomUser.objects.filter(email=email).exists():
        return Response(
            {"msg": "Email already exists."}, status=status.HTTP_409_CONFLICT
        )

    if CustomUser.objects.filter(username=username).exists():
        return Response(
            {"msg": "Username already exists."}, status=status.HTTP_409_CONFLICT
        )

    new_user = CustomUser(username=username, email=email)
    new_user.set_password(password) 
    new_user.save()

    serializer = UserSerializer(new_user)

    return Response(
        {"ok": True},
        status=status.HTTP_201_CREATED,
    )

@api_view(["POST"])
def login(request):
    data = request.data
    email = data.get("email")
    password = data.get("password")

    user = CustomUser.objects.filter(email=email).first()

    if user is None:
        return Response({"msg": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)

    if not check_password(password, user.password):
        return Response({"msg": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)

    django_login(request, user)

    refresh = RefreshToken.for_user(user)
    access_token = str(refresh)

    serializer = UserSerializer(user)
    return Response({"token": access_token, "user": serializer.data, "ok": True, "id": user.pk})
