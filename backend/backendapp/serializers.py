
from rest_framework import serializers
from .models import Income,Cost,Category

class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('categoryId', 'name' )
class IncomeSerializers(serializers.ModelSerializer):
    category=CategorySerializers(read_only=True)
    category_data=CategorySerializers(write_only=True,required=False)
    class Meta:
        model = Income
        fields = ('transactionId', 'transactionSum','category' ,'transactionDate' ,'transactionDescription','category_data')
    def create(self, validated_data):
        category_data=validated_data.pop('category_data')
        category,_=Category.objects.get_or_create(**category_data)
        return Income.objects.create(category=category,**validated_data)
    def update(self, instance, validated_data):
        category_data=validated_data.pop('category_data')
        if category_data:
            category,_=Category.objects.get_or_create(**category_data)
            instance.category=category
        instance.transactionId=validated_data.get('transactionId',instance.transactionId)
        instance.transactionSum=validated_data.get('transactionSum',instance.transactionSum)
        instance.transactionDate=validated_data.get('transactionDate',instance.transactionDate)
        instance.transactionDescription=validated_data.get('transactionDescription',instance.transactionDescription)
        instance.save()
        return instance

class CostSerializers(serializers.ModelSerializer):
    category=CategorySerializers(read_only=True)
    category_data=CategorySerializers(write_only=True,required=False)
    class Meta:
        model = Cost
        fields = ('transactionId', 'transactionSum','category' ,'transactionDate' ,'transactionDescription','category_data' )

    def create(self, validated_data):
        category_data=validated_data.pop('category_data')
        category,_=Category.objects.get_or_create(**category_data)
        return Cost.objects.create(category=category,**validated_data)
    
    def update(self, instance, validated_data):
        category_data=validated_data.pop('category_data')
        if category_data:
            category,_=Category.objects.get_or_create(**category_data)
            instance.category=category
        instance.transactionId=validated_data.get('transactionId',instance.transactionId)
        instance.transactionSum=validated_data.get('transactionSum',instance.transactionSum)
        instance.transactionDate=validated_data.get('transactionDate',instance.transactionDate)
        instance.transactionDescription=validated_data.get('transactionDescription',instance.transactionDescription)
        instance.save()
        return instance

