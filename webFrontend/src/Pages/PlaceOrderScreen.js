import React from "react";
import { useEffect} from "react";
import {  Col, Row, ListGroup, Image,Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import Message from "../components/UI/Message";
import { Link } from "react-router-dom";
import { orderCreate,orderCreateReset,resetCart } from "../store/cart-actions";

function PlaceOrderScreen() {
  const { shippingDetails, paymentMethod, cart } = useSelector(
    (state) => state.cart
  );

  const dispatch=useDispatch()
  const history=useNavigate()
  const {isSucess,orderCreateDetails}=useSelector((state)=>state.order)

  const itemPrice=cart.reduce((acc,item)=>(acc+item.quantity*item.price),0).toFixed(2)
  const shippingPrice=(itemPrice>400?0:10).toFixed(2)
  const taxPrice=(itemPrice*0.02).toFixed(2)
  const totalAmount=Number(itemPrice)+Number(shippingPrice)+Number(taxPrice)

    useEffect(
        ()=>{
            if (isSucess){
                history(`/order/${orderCreateDetails._id}`)
                dispatch(orderCreateReset())
                dispatch(resetCart())
            }
        },[isSucess,history,dispatch]
    )

    const onPlaceOrderHandler=()=>{
        dispatch(orderCreate({
            orderItem:cart,
            shipping:shippingDetails,
            payment:paymentMethod,
            itemPrice:itemPrice,
            taxPrice:taxPrice,
            shippingPrice:shippingPrice,
            totalAmount:totalAmount
        }))
        
    }

  return (
    <div>
      <ProgressBar step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Shipping: </strong>
                {shippingDetails.address}, {shippingDetails.city}{" "}
                {shippingDetails.postalcode}, {shippingDetails.country},
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod.toUpperCase()}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Ordered Items</h2>

              {cart.length === 0 ? (
                <Message>Your cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x {item.price} = ${(item.quantity*item.price).toFixed(2)}
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
                            <Col>${itemPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping Price:</Col>
                            <Col>${shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax Price:</Col>
                            <Col>${taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total Amount:</Col>
                            <Col>${totalAmount.toFixed(2)}</Col>
                        </Row>
                    </ListGroup.Item>
            <ListGroup.Item>
                <Row>

                    <button type="button" className="btn btn-primary btn-block" disabled={cart.length===0} onClick={onPlaceOrderHandler}>
                        PlaceOrder
                    </button>
                </Row>
                </ListGroup.Item>  
            </ListGroup>  
            </Card>      
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
