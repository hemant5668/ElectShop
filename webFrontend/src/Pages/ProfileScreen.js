import React from "react";
import { useState, useEffect } from "react";
import { Col, Form, Row, Button,Table } from "react-bootstrap";
import { Link,useLocation,useNavigate } from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap'
import Loader from "../components/UI/Loader";
import Message from "../components/UI/Message";
import FormContainer from "../components/UI/FormContainer";
import { useDispatch,useSelector } from "react-redux";
import {getUserDetails} from "../store/cart-actions";
import { updateUserProfile,myOrders } from "../store/cart-actions";

function ProfileScreen() {

    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [confirmPassword, setconfirmPassword] = useState('');
    const [password, setpassword] = useState('');
    const [messageCos, setmessageCos] = useState('');
  
    const dispatch=useDispatch()
    const history=useNavigate()


    const userDetails=useSelector(state=>state.profile)
    const {details, isFailed,message,isloading}=userDetails

    const update125=useSelector(state=>state.updateProfile)
    const {update,updatedMsg}=update125
    
    const login=useSelector(state=>state.login)
    const {userInfo}=login

    const myOrder=useSelector(state=>state.myOrders)
    const {myAllOrders,isFailed1,isloading1,isSucess1,message1}=myOrder
  
    useEffect(()=>{
      if(!isSucess1 || myAllOrders===[] ){
        dispatch(myOrders())
      }
    },[dispatch,isSucess1,myAllOrders])

    
      useEffect(()=>{
          if (!userInfo){
              history('/login')
          }
          else{
            if(!details || userInfo._id!==details._id ){
                dispatch(getUserDetails('profile'))
            }
            else{
                setusername(details.name)
                setemail(details.email)  
            }
          }
      },[details,userInfo,dispatch,history])
  
  
    const onSubmitHandler = (event) => {
             event.preventDefault();
            if (password!==confirmPassword){
                setmessageCos("password does'nt match")
            }else{
                dispatch(updateUserProfile({'name':username,'email':email,'password':password}))
                
            }
        }
        
        return (
            <Row>
        <Col md={3}><h1>User Details</h1>
        {updatedMsg && <Message variant='warning'>{updatedMsg}</Message>}
        
        {messageCos && <Message variant='warning'>{messageCos}</Message>}
      {isFailed && <Message variant='warning'>{message}</Message>}
      {isloading && <Loader/>}
      <Form onSubmit={onSubmitHandler}>
      <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="username"
            placeholder="enter name"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="enter email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          ></Form.Control>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="Confirmpassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="Confirm password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Update
        </Button>
      </Form>

         </Col>
        <Col md={9}><h1>My Orders</h1> 
          {isloading1 ? <Loader/>:
            (isFailed1 ? <Message variant='danger'>{message1}</Message> 
                   :(       

        <Table striped responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            
           {myAllOrders.map((order,index=1)=>(<tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{order.createdAt}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>{order.paidAt ? order.paidAt :(<i className=" fas fa-times" style={{color:'red'}}></i>)} </td>
                                        <td>{order.DeliveredAt ? order.DeliveredAt :(<i className=" fas fa-times" style={{color:'red'}}></i>)} </td>
                                        <td>
                                        <LinkContainer to={`/order/${order._id}/`}>
                                          <button className='mx-2' color='dark'>Details</button>
                                        </LinkContainer>
                                          </td>  
                                    </tr>)
           )}
          </tbody>
        </Table>))}
        </Col>
    </Row>
  )
}

export default ProfileScreen