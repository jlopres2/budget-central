from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ExpenseSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Expense

from .plaid_client import client
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from plaid.model.products import Products
from plaid.model.country_code import CountryCode
from plaid.model.item_public_token_exchange_request import ItemPublicTokenExchangeRequest
from plaid.model.transactions_get_request import TransactionsGetRequest
from plaid.model.transactions_get_request_options import TransactionsGetRequestOptions
from datetime import date

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



@csrf_exempt
def create_link_token(request):
    user = LinkTokenCreateRequestUser(client_user_id="user-id-123")
    request_data = LinkTokenCreateRequest(
        user=user,
        client_name="Your App",
        products=[Products("transactions")],
        country_codes=[CountryCode("US")],
        language="en"
    )
    response = client.link_token_create(request_data)
    return JsonResponse(response.to_dict())

@csrf_exempt
def exchange_public_token(request):
    data = json.loads(request.body)
    public_token = data.get("public_token")

    if not public_token:
        return JsonResponse({"error": "public_token is required"}, status=400)

    response = client.item_public_token_exchange(
        ItemPublicTokenExchangeRequest(public_token=public_token)
    )
    access_token = response.to_dict().get("access_token")

    return JsonResponse({"access_token": access_token})


    
@csrf_exempt
def get_transactions(request):
    try:
        print("🟡 Incoming /api/transactions/ request")
        body = json.loads(request.body)
        access_token = body.get("access_token")

        print("🔑 Access token received:", access_token)
        if not access_token:
            return JsonResponse({"error": "Access token required"}, status=400)

        req = TransactionsGetRequest(
            access_token=access_token,
            start_date=date(2023, 1, 1),
            end_date=date(2025, 12, 31),
            options=TransactionsGetRequestOptions(count=10)
        )

        print("📤 Sending request to Plaid")
        res = client.transactions_get(req)
        print("✅ Transactions retrieved successfully")

        transactions = res.to_dict()["transactions"]

        # 🔍 DEBUG PRINT
        print("✅ Transactions received:")
        for txn in transactions:
            print(txn)
            # print(f"  🧾 {txn['date']} - {txn['name']}: ${txn['amount']}")

        return JsonResponse(res.to_dict())

    except Exception as e:
        import traceback
        print("❌ Exception during /api/transactions/:", traceback.format_exc())
        return JsonResponse({"error": str(e)}, status=500)