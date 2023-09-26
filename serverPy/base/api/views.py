from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import login as django_login
from ..models import CustomUser, Expense, Income
from .serializers import UserSerializer, ExpenseSerializer, IncomeSerializer


# CREATE ACCOUNT
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
    return Response(
        {"ok": True},
        status=status.HTTP_201_CREATED,
    )


# LOGIN
@api_view(["POST"])
def login(request):
    data = request.data
    email = data.get("email")
    password = data.get("password")

    user = CustomUser.objects.filter(email=email).first()

    if user is None:
        return Response(
            {"msg": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST
        )

    if not check_password(password, user.password):
        return Response(
            {"msg": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST
        )

    django_login(request, user)

    refresh = RefreshToken.for_user(user)
    access_token = str(refresh)

    serializer = UserSerializer(user)
    return Response(
        {"token": access_token, "user": serializer.data, "ok": True, "id": user.pk}
    )


# CREATE EXPENSES
@api_view(["POST"])
@authentication_classes([JWTAuthentication])
def create_expense(request):
    serializer = ExpenseSerializer(data=request.data)
    user = CustomUser.objects.get(pk=request.data["userId"])
    if serializer.is_valid():
        serializer.save(user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# READ EXPENSES
@api_view(["GET"])
@authentication_classes([JWTAuthentication])
def get_expenses(request, userId):
    user = CustomUser.objects.get(pk=userId)
    expenses = Expense.objects.filter(user=user)
    serializer = ExpenseSerializer(
        expenses, many=True
    ) 
    return Response(serializer.data, status=status.HTTP_200_OK)


# CREATE INCOMES
@api_view(["POST"])
@authentication_classes([JWTAuthentication])
def create_income(request):
    serializer = IncomeSerializer(data=request.data)
    user = CustomUser.objects.get(pk=request.data["userId"])
    if serializer.is_valid():
        serializer.save(user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# READ INCOMES
@api_view(["GET"])
@authentication_classes([JWTAuthentication])
def get_incomes(request, userId):
    user = CustomUser.objects.get(pk=userId)
    incomes = Income.objects.filter(user=user)
    serializer = IncomeSerializer(
        incomes, many=True
    ) 
    return Response(serializer.data, status=status.HTTP_200_OK)
