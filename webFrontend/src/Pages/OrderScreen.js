import React from "react";
import { useEffect} from "react";
import {  Col, Row, ListGroup, Image,Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import Message from "../components/UI/Message";
import Loader from "../components/UI/Loader";
import { Link } from "react-router-dom";
import { getOrderDetails } from "../store/cart-actions";

function OrderScreen() {

  const param=useParams()
  const orderId=param.id
  const dispatch=useDispatch()
  console.log(orderId)
  
  // 
  
  
  const { orderDetails,message,isSucess, isFailed,isLoading } = useSelector((state) => state.orderDetail);
  console.log(isSucess)
  
  // const itemPrice=orderDetails.orderItems.reduce((acc,item)=>(acc+item.qty*item.price),0).toFixed(2)
  if (isSucess===false){
          console.log("jikpk")
          dispatch(getOrderDetails(orderId))
          console.log("jikpkvhbbfdoglrdjgiud")
}
  useEffect(()=>{
        if (isSucess===false){

            dispatch(getOrderDetails(orderId))
        }
    },[isSucess,orderId])
    

  return isLoading ? (<Loader/>): isFailed? (<Message variant='danger'>{message}</Message>):  (
    <div>
      
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{orderId}</h2>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {orderDetails.user.name}
              </p>
              
              <p>
                <strong>Email: </strong>
                
                {orderDetails.user.email}
              </p>
              
              <p>
                <strong>Shipping: </strong>
                {orderDetails.shipping.address}, {orderDetails.shipping.city}{" "}
                {orderDetails.shipping.postalcode}, {orderDetails.shipping.country},
              </p>
              {orderDetails.isDelivered ? <Message variant='success'>Delivered on {orderDetails.DeliveredAt}</Message>
                                  :
                                  <Message variant='warning'>Not Delivered</Message>
                                  }
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {orderDetails.paymentMethod.toUpperCase()}
              </p>
              {orderDetails.isPaid ? <Message variant='success'>Paid on {orderDetails.paidAt}</Message>
                                  :
                                  <Message variant='warning'>Not Paid</Message>
                                  }
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Ordered Items</h2>

              {orderDetails.orderItems.length === 0 ? (
                <Message>Your order is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {orderDetails.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x {item.price} = ${(item.qty*item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
            <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Item:</Col>
                            {/* <Col>${itemPrice}</Col> */}
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping Price:</Col>
                            <Col>${orderDetails.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax Price:</Col>
                            <Col>${orderDetails.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total Amount:</Col>
                            <Col>${orderDetails.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
            
            </ListGroup>  
            </Card>      
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
