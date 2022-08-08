
from rest_framework import serializers
from .models import Product,Order,OrderItems,ShippingAddress,Review
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken



class ProductSerializer(serializers.ModelSerializer):
    review=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=Product
        fields='__all__'

    def get_review(self,obj):
        reviews=obj.review_set.all()
        serializer=ReviewSerializer(reviews,many=True)
        return serializer.data



class UserSerializer(serializers.ModelSerializer):
    name =serializers.SerializerMethodField(read_only=True)
    _id =serializers.SerializerMethodField(read_only=True)
    isAdmin=serializers.SerializerMethodField(read_only=True)

    class Meta:
        model=User
        fields=['id','_id','username','email','name','isAdmin']

    def get__id(self,obj):
        return obj.id

    def get_isAdmin(self,obj):
        return obj.is_staff

    def get_name(self, obj):
        name=obj.first_name
        if name=='':
            name=obj.email        

        return name    

class  UserSerializerWithToken(UserSerializer): 
    token=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=User
        fields=['id','_id','username','email','name','isAdmin','token']  

    def get_token(self,obj):
        token=RefreshToken.for_user(obj)
        return str(token.access_token)    


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=OrderItems
        fields='__all__'  

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model=Review
        fields='__all__'  

class ShippingSerializer(serializers.ModelSerializer):
    class Meta:
        model=ShippingAddress
        fields='__all__'              

class OrderSerializer(serializers.ModelSerializer):
    orderItems=serializers.SerializerMethodField(read_only=True)
    shipping=serializers.SerializerMethodField(read_only=True)
    user=serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model=Order
        fields='__all__'        

    def get_orderItems(self,obj):
        items=obj.orderitems_set.all()
        serializer=OrderItemSerializer(items,many=True)
        return serializer.data

    def get_shipping(self,obj):
        try:
            address=ShippingSerializer(obj.shippingaddress,many=False).data
        except:
            address=False    
        return address

    def get_user(self,obj):    
        user=obj.user
        serializer=UserSerializer(user,many=False)
        return serializer.data
