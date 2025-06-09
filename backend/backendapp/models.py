from django.db import models

# Create your models here.
class Category(models.Model):
    categoryId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)


class Income(models.Model):
    transactionId = models.AutoField(primary_key=True)
    transactionSum = models.DecimalField(max_digits=12, decimal_places=2)
    category = models.ForeignKey(Category,on_delete=models.CASCADE)
    transactionDate = models.DateField()
    transactionDescription = models.CharField(max_length=50)

    def __str__(self):
        return self.transactionDescription
    
class Cost(models.Model):
    transactionId = models.AutoField(primary_key=True)
    transactionSum = models.DecimalField(max_digits=12, decimal_places=2)
    category = models.ForeignKey(Category,on_delete=models.CASCADE)
    transactionDate = models.DateField()
    transactionDescription = models.CharField(max_length=50)

    def __str__(self):
        return self.transactionDescription
    

