from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from .serializers import CostSerializers,IncomeSerializers
from .models import Cost,Income,Category
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum
from decimal import Decimal
# Create your views here.
cat_id=[1,2,3,4]
cat_name=['Jedzenie','Transport','Rozrywka','Zdrowie']


@csrf_exempt
def incomeAPI(request, id=0):
    categories=Category.objects.all()
    if not categories.exists():
        for i in range(len(cat_id)):
            Category.objects.create(name=cat_name[i])
    
    if request.method == 'POST':
        income_data = JSONParser().parse(request)
        income_serializer =IncomeSerializers(data=income_data)
        if income_serializer.is_valid(raise_exception=True):
            income_serializer.save()
            return JsonResponse("Dodano przychód!!" , safe=False)
        return JsonResponse("Błąd zapisu", safe=False)
    elif request.method=='GET':
        incomes = Income.objects.all()
        incomes_serializer = IncomeSerializers(incomes, many=True)
        return JsonResponse(incomes_serializer.data, safe=False)
    elif request.method == 'PUT':
        income_data = JSONParser().parse(request)
        income = Income.objects.get(transactionId=income_data['transactionId'])
        income_serializer = IncomeSerializers(income, data=income_data)
        if income_serializer.is_valid():
            income_serializer.save()
            return JsonResponse("Zaktualizowane!!" , safe=False)
        return JsonResponse("Błąd aktualizacji", safe=False)
    elif request.method == 'DELETE':
        income = Income.objects.get(transactionId=id)
        income.delete()
        return JsonResponse("Usunięto!!" , safe=False) 
@csrf_exempt
def costAPI(request, id=0):
    if request.method == 'POST':
        cost_data = JSONParser().parse(request)
        cost_serializer =CostSerializers(data=cost_data)
        if cost_serializer.is_valid(raise_exception=True):
            cost_serializer.save()
            return JsonResponse("Dodano koszt!!" , safe=False)
        return JsonResponse("Błąd zapisu", safe=False)
    elif request.method=='GET':
        costs = Cost.objects.all()
        costs_serializer = CostSerializers(costs, many=True)
        return JsonResponse(costs_serializer.data, safe=False)
    elif request.method == 'PUT':
        cost_data = JSONParser().parse(request)
        cost = Cost.objects.get(transactionId=cost_data['transactionId'])
        cost_serializer = CostSerializers(cost, data=cost_data)
        if cost_serializer.is_valid():
            cost_serializer.save()
            return JsonResponse("Zaktualizowane!!" , safe=False)
        return JsonResponse("Błąd aktualizacji", safe=False)
    elif request.method == 'DELETE':
        cost = Cost.objects.get(transactionId=id)
        cost.delete()
        return JsonResponse("Usunięto!!" , safe=False) 
    

class costCategoriesAPI(APIView):
    def get(self, request):
        data = (
            Cost.objects
            .values("category__name")
            .annotate(sum=Sum("transactionSum"))
        )

        result = [
            {"category": d["category__name"], "sum": float(d["sum"])}
            for d in data
        ]
        return Response(result)

class costMonthsAPI(APIView):
    def get(self, request):
        data = (
            Cost.objects
            .values("transactionDate__month")
            .annotate(sum=Sum("transactionSum"))
            .order_by("transactionDate__month")
        )

        map = {r["transactionDate__month"]: r["sum"] for r in data}
        

        result = []
        for m in range(1, 13):
            sum = map.get(m, Decimal("0"))
            result.append({"month": m, "sum": float(sum)})

        return Response(result)
    
class costMonthAPI(APIView):
    def get(self, request, id: int):
        total: Decimal = (
            Cost.objects
            .filter(transactionDate__month=id)
            .aggregate(total=Sum("transactionSum"))["total"] or Decimal("0")
        )
        return Response({
            "month": id,
            "sum":   total,
        })
class incomeMonthAPI(APIView):
    def get(self, request, id: int):
        total: Decimal = (
            Income.objects
            .filter(transactionDate__month=id)
            .aggregate(total=Sum("transactionSum"))["total"] or Decimal("0")
        )
        return Response({
            "month": id,
            "sum":   total,
        })