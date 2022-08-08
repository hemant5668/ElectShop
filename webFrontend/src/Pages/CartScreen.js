import React from 'react'
import { addToCartCreate, removeCartItem } from '../store/cart-actions'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link, useParams,useNavigate,useLocation } from "react-router-dom";
import { Row,Col, ListGroup ,Image,Form, Button, Card} from 'react-bootstrap';
import Message from '../components/UI/Message';


function CartScreen() {
    const param=useParams();
    const location=useLocation()
    let history=useNavigate();
    const queryParams= new URLSearchParams(location.search)
    const qty=Number(queryParams.get('qty'))
    const id=param.Product_Id
    const dispatch=useDispatch()
    const Xcart=useSelector(state=>state.cart)
    const {cart,message,isFailed }=Xcart

    useEffect(()=>{
        if(id){
            dispatch(addToCartCreate(id,qty))
        }
    },[dispatch,id,qty])

   const onRemoveHandler=(id)=>{
        dispatch(removeCartItem(id))
   }

   const onCheckOutHandler=()=>{
        history('/login?redirect=shipping')
   }


  return (
    <Row>
        <Col md={8}>
        <h1>Shopping Cart</h1>
        {isFailed?<Message variant='danger'>{message}</Message>
                 :cart.length===0?<Message variant='info'>Your cart is empty <Link to="/">Go Back</Link></Message>
                                   :(<ListGroup variant='flush'>

                                   {cart.map(item=>(
                                        <ListGroup.Item key={item._id}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} fluid rounded/>
                                                </Col>
                                                <Col md={3}>
                                                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={2}>
                                                    ${item.price}
                                                </Col>
                                                <Col md={3}>
                                                    <Form.Control as='select' value={item.quantity} onChange={(event)=>dispatch(addToCartCreate(item._id,Number(event.target.value)))} >
                                                        {
                                                            [...Array(item.countInStock).keys()].map((x)=>(
                                                                <option key={x+1} value={x+1}> {x+1} </option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </Col>
                                                <Col>
                                                <Button type='button' variant='light' onClick={()=>onRemoveHandler(item._id) }>
                                                    <i className='fas fa-trash'></i>
                                                </Button >
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                   ))}
                                   </ListGroup>)

                                   
        }
        </Col>
        <Col md={4}>
            <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>SubTotal ({cart.reduce((total,curr)=>(total += curr.quantity),0)}) items</h2>
                   <h3> ${cart.reduce((total,curr)=>(total +curr.quantity* curr.price),0).toFixed(2)}</h3>
                </ListGroup.Item>
            </ListGroup>
                <ListGroup.Item>
                    <Row>

                    <Button type='button' className='btn-block' disabled={cart.length===0} onClick={onCheckOutHandler}>
                        Proceed to CheckOut
                    </Button>
                    </Row>
                </ListGroup.Item>
            </Card>
        </Col>
    </Row>
  )
}

export default CartScreen