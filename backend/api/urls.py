from django.urls import path
from . import views
# from .views import get_expenses

urlpatterns = [
    # path('expenses/', get_expenses, name = 'get_books'),
    path("expenses/", views.ExpenseListCreate.as_view(), name="expense-list"),
    path("expenses/delete/<int:pk>", views.ExpenseDelete.as_view(), name="delete-note"),
    path('create_link_token/', views.create_link_token),
    path('exchange_public_token/', views.exchange_public_token),
    path('transactions/', views.get_transactions),   
]