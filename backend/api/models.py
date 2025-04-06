from django.db import models
from django.contrib.auth.models import User 

# Create your models here.
class Expense(models.Model):
    title = models.CharField(max_length=25)
    description = models.CharField(max_length=50)
    amount = models.DecimalField( max_digits=5, decimal_places=2)
    author = models.ForeignKey(User, related_name="expenses", on_delete=models.CASCADE)
    # date = models.DateField()
    date = models.CharField(max_length=25)
    
    CATEGORY_CHOICES = [
        ('Leisure', 'Leisure'), #option, option display
        ('Expense', 'Expense'),
        ('Savings', 'Savings'),
    ]
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES, default='option1')
    def __str__(self):
        return self.title