from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ExpenseSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Expense
# from rest_framework.response import Response
# from rest_framework.decorators import api_view

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class ExpenseListCreate(generics.ListCreateAPIView):
    serializer_class = ExpenseSerializer
    permission_class = [IsAuthenticated]
    # permission_class = [ALLOW_ANY]

    def get_queryset(self):
        user = self.request.user
        return Expense.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
    
class ExpenseDelete(generics.DestroyAPIView):
    serializer_class = ExpenseSerializer
    permission_class = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Expense.objects.filter(author = user)
    


# @api_view(['GET'])
# def get_expenses(request):
#     permission_classes = [AllowAny]
#     expenses = Expense.objects.all()
#     serializedData = ExpenseSerializer(expenses, many=True).data
#     return Respnse(serializedData)

# @api_view(['POST'])
# def create_expenses(request):
#     data = request.data
#     serializer = ExpenseSerializer(data = data)
#     if (serializer.is_valid()):
#         serializer.save()
#         return Response(serializer.data, status = status.HTTP_201_CREATED)
#     return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
