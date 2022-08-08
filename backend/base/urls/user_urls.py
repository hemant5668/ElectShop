from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('delete/<str:pk>',views.deleteUser,name='delete-user'),
    path('<str:pk>/edit',views.getUser,name='edit-user'),
    path('update/<str:pk>',views.updateuser,name='update-user'),
    path('register/',views.registerUser,name='reguser'),
    path('',views.getUsers,name='users'),
    path("profile/",views.getUserProfile,name='userprofile'),
    path("profile/update/",views.updateUserProfile,name='update-user-profile'),
]
