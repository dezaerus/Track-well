from rest_framework import serializers
from ..models import CustomUser, Income, Expense


from rest_framework import serializers


class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ["description", "amount", "category", "date"]
   

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ["description", "amount", "category", "date"]
   

class UserSerializer(serializers.ModelSerializer):
    income = IncomeSerializer(many=True, read_only=True)
    expense = ExpenseSerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = ("id", "username", "email", "income", "expense")
