from django.urls import path
from . import views
from .views import costCategoriesAPI, costMonthsAPI,costMonthAPI,incomeMonthAPI

urlpatterns = [
    path('income', views.incomeAPI),
    path('income/<int:id>', views.incomeAPI),
    path('cost', views.costAPI),
    path('cost/<int:id>', views.costAPI),
    path("cost/categories", costCategoriesAPI.as_view()),
    path("cost/months", costMonthsAPI.as_view()),
    path('cost/months/<int:id>', costMonthAPI.as_view()),
    path('income/months/<int:id>', incomeMonthAPI.as_view()),

]