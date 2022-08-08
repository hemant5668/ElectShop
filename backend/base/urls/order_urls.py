from django.urls import path
from base.views import order_views 

urlpatterns = [
    path('add/',order_views.Order, name='add-order'),
    path('myorders/',order_views.getMyOrders, name='my-order'),
    path('getorders/',order_views.getOrders, name='all-orders'),

    path('<str:pk>/',order_views.getOrderById, name='get-order'),
    path('<str:pk>/pay/',order_views.OrderPay, name='pay-order'),

]