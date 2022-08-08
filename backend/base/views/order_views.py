
from ast import Or
from tkinter import TRUE
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from rest_framework.response import Response
from base.models import Product,OrderItems,ShippingAddress
from base.serializer import OrderSerializer
from rest_framework import status
from base.models import Order as OrderModel
from datetime import datetime

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def Order(request):
    user=request.user
    data=request.data

    OrderItem=data['orderItem']

    if OrderItem and len(OrderItem)==0:
        return Response({'details':'No items in order list'},status=status.HTTP_400_BAD_REQUEST)
    else:
        # 1 create order
        orderObj=OrderModel.objects.create(
            user=user,
            paymentMethod=data['payment'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalAmount'],
            taxPrice=data['taxPrice'],
        )

        # 3 create Order Items and set order relation to orderItems
        for i in OrderItem:
            product=Product.objects.get(_id=i['_id'])
            item=OrderItems.objects.create(
                product=product,
                order=orderObj,
                name=product.name,
                price=i['price'],
                image=product.image.url,
                qty=i['quantity'],
            )
        # 4 recude procuct stock 
            product.countInStock -=item.qty
            product.save()
        # 2 Shipping detils fill up
        shipping=ShippingAddress.objects.create(
            address=data['shipping']['address'],
            city=data['shipping']['city'],
            country=data['shipping']['country'],
            postalCode=data['shipping']['postalcode'],
            shippingPrice=data['shippingPrice'],
            order=orderObj,
        )

        serial=OrderSerializer(orderObj,many=False)
        
        return Response(serial.data)    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user1=request.user
    myOrder=OrderModel.objects.filter(user=user1)
    if len(myOrder)==0:
        return Response({'details': 'No Orders made yet'})
    serialize=OrderSerializer(myOrder,many=True)
    return Response(serialize.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,pk):
    user=request.user

    try:
        orderObj=OrderModel.objects.get(_id=pk)
        if user.is_staff or orderObj.user==user:
            seralizer=OrderSerializer(orderObj,many=False)
            return Response(seralizer.data)
        else:
            return Response({'detais':'No unauthorised user is allowed to view the order'}, status=status.HTTP_400_BAD_REQUEST)    
    except:
            return Response({'detais':'No order exists by this Id'}, status=status.HTTP_400_BAD_REQUEST)    

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def OrderPay(request,pk):
    OrderPay=OrderModel.objects.get(_id=pk)
    OrderPay.isPaid=True
    OrderPay.paidAt=datetime.now()
    OrderPay.save()
    return Response("Order was paid")


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    myOrder=OrderModel.objects.all()
    if len(myOrder)==0:
        return Response({'details': 'No Orders made yet'})
    serialize=OrderSerializer(myOrder,many=True)
    return Response(serialize.data)