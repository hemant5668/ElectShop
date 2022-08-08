import React from "react";
import { useEffect} from "react";
import {  Col, Row, ListGroup, Image,Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  useParams ,useNavigate} from "react-router-dom";
import Message from "../components/UI/Message";
import Loader from "../components/UI/Loader";
import { Link } from "react-router-dom";
import { getOrderDetails } from "../store/cart-actions";
import { payment } from "../store/cart-actions";

function OrderScreen1() {

    const param=useParams()
    const orderId=param.id
    const dispatch=useDispatch()
    const history=useNavigate()
    console.log(orderId)

    const xOrderData = useSelector((state) => state.orderDetail);
    const { OneOrderDetail,message,isSucess, isFailed,isLoading }=xOrderData

    useEffect(() => {
        if(!OneOrderDetail || OneOrderDetail._id !==Number(orderId)){
                dispatch(getOrderDetails(orderId))
        }
      },[OneOrderDetail,orderId]);

    // useEffect(()=>{
    //     if (isSucess===false || OneOrderDetail._id!==orderId){
    //       console.log("yrss")
    //       dispatch(getOrderDetails(orderId))
    //     }
    //   },[isSucess,orderId,OneOrderDetail._id])  

      const paymentHandler=()=>{
        history(`pay/`)
      }

  return (
    isLoading ? (<Loader/>): !isSucess? (<Message variant='danger'>{message}</Message>):  (
    <div>
        <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{orderId}</h2>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {OneOrderDetail.user.name}
              </p>
              
              <p>
                <strong>Email: </strong>
                
                {OneOrderDetail.user.email}
              </p>
              <p>
                <strong>Shipping: </strong>
                {OneOrderDetail.shipping.address}, {OneOrderDetail.shipping.city}{" "}
                {OneOrderDetail.shipping.postalcode}, {OneOrderDetail.shipping.country},
              </p>
              {OneOrderDetail.isDelivered ? <Message variant='success'>Delivered on {OneOrderDetail.DeliveredAt}</Message>
                                  :
                                  <Message variant='warning'>Not Delivered</Message>
                                  }
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {OneOrderDetail.paymentMethod.toUpperCase()}
              </p>
              {OneOrderDetail.isPaid ? <Message variant='success'>Paid on {OneOrderDetail.paidAt}</Message>
                                  :
                                  <Message variant='warning'>Not Paid</Message>
                                  }
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Ordered Items</h2>

              {OneOrderDetail.orderItems.length === 0 ? (
                <Message>Your order is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {OneOrderDetail.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} = ${(item.qty*item.price).toFixed(2)}
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
                        <Col>    {OneOrderDetail.orderItems.reduce((acc,item)=>(acc+item.qty*item.price),0).toFixed(2)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping Price:</Col>
                            <Col>${OneOrderDetail.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax Price:</Col>
                            <Col>${OneOrderDetail.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total Amount:</Col>
                            <Col>${OneOrderDetail.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>

                    <Button onClick={paymentHandler}>DO PAYMENT  </Button>
                        </Row>
                    </ListGroup.Item>
            
            </ListGroup>  
            </Card>      
        </Col>
      </Row>
    </div>)
  )
}

export default OrderScreen1