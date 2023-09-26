from django.urls import path
from . import views

urlpatterns = [
    # REGESTER
    path("auth/register", views.register, name="register"),
    # LOGIN
    path("auth/login", views.login, name="login"),
    # CREATE Expense
    path("expenses", views.create_expense, name="create_expense"),
    # READ Expenses
    path("expenses/<int:userId>/", views.get_expenses, name="get_expenses"),
    # CREATE Income
    path("income", views.create_income, name="create_income"),
    # READ Incomes
    path("income/<int:userId>", views.get_incomes, name="get_incomes"),
]
