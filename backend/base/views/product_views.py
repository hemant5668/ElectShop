from itertools import product
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from base.serializer import ProductSerializer
from base.models import Product,Review


@api_view(['GET'])
def getProduct(request,pk):
    product=Product.objects.get(_id=pk)
    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data)    

@api_view(['GET'])
def getProducts(request):
    query=request.query_params.get('keyword')
    # print(request.data)
    if query==None:
        query=''
    products=Product.objects.filter(name__icontains=query)
    serializer=ProductSerializer(products,many=True)
    return Response(serializer.data)   

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteproduct(request,pk):
    product=Product.objects.get(_id=pk)
    product.delete()
    return Response("Product deleted"+pk) 

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateproduct(request,pk):    
    data=request.data
    user=request.user
    product=Product.objects.get(_id=pk)
    product.user=user
    product.name=data['name']
    product.image=request.FILES.get('image')
    product.brand=data['brand']
    product.description=data['description']
    product.category=data['category']
    product.price=data['price']
    product.countInStock=data['countInStock']

    product.save()

    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createNewProduct(request):
    user=request.user    
    data=request.data  
    product=Product.objects.create(
        user=user,
        name=data['name'],
        brand=data['brand'],
        image=request.FILES.get('image'),
        description=data['description'],
        price=data['price'],
        category=data['category'],
        countInStock=data['countInStock'],
    )
    return Response("Product created")

@api_view(['GET'])
def uploadimg(request,pk):
    data=request.data
    product=Product.objects.get(_id=pk)
    product.image=request.FILES.get('image')
    product.save()
    return Response("Image uploaded")

@api_view(['Post'])
@permission_classes([IsAuthenticated])
def createreview(request,pk):
    user=request.user
    data=request.data
    product=Product.objects.get(_id=pk)
    already=product.review_set.filter(user=user).exists()

    #if review already exists, then second review not allowed
    if already:
        return Response("Second review not allowed")

    # if rating 0
    elif data['rating']==0:
        return Response({'details':"Select a rating"},status=status.HTTP_400_BAD_REQUEST)
        
    #create review
    else:
        review=Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment']

        )
        totalreviews=product.review_set.all()
        product.numReviews=len(totalreviews)
        
        total=0
        for i in totalreviews:
            total+=i.rating
        
        product.rating=total/len(totalreviews)
        product.save()

        return Response('Review added')