from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path("",views.getProducts, name='products'),
    path("<str:pk>",views.getProduct, name='product'),
    path("<str:pk>/review/",views.createreview, name='add-review'),
    path("create/",views.createNewProduct, name='createnew-product'),
    path("edit/<str:pk>/",views.updateproduct, name='edit-product'),
    path("<str:pk>/delete/",views.deleteproduct, name='delete-product'),
]
