import React from "react";
import { useState, useEffect } from "react";
import { Col, Form, Row, Button,Container } from "react-bootstrap";
import { Link,useLocation,useNavigate } from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap'
import Loader from "../components/UI/Loader";
import Message from "../components/UI/Message";
import FormContainer from "../components/UI/FormContainer";
import { useDispatch,useSelector } from "react-redux";
import {updateUserProfile,updateUserAdmin} from "../store/cart-actions";
import { getUser} from "../store/cart-actions";
import { useParams } from "react-router-dom";

function UserEditScreen() {

    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [isAdmin, setisAdmin] = useState(false);

    const userDetails=useSelector(state=>state.profile)
    const {details, isFailed,message,isloading}=userDetails

    

    const login=useSelector(state=>state.login)
    const {userInfo}=login

    const dispatch=useDispatch()
    const history=useNavigate()
    const param=useParams()
    const orderID=param.id

    useEffect(()=>{
        if (!userInfo){
            history('/login')
        }
        else{
          if(!details || details._id!==Number(orderID) ){
              dispatch(getUser(orderID))
          }
          else{
              setusername(details.name)
              setemail(details.email)  
              setisAdmin(details.isAdmin)  
          }
        }
    },[details,userInfo,dispatch,history,orderID])


    const onSubmitHandler = (event) => {
        event.preventDefault();
        dispatch(updateUserAdmin({'name':username,
                            'email':email,
                            'isAdmin':isAdmin},orderID))
        
            history('/admin/userlist')
       
   }

  return (
    <div>
        <Link to="/admin/userlist" className="btn btn-light my-3">
        Go back
      </Link>
        <FormContainer>
            
            <h1>Edit User </h1>
            {isloading && <Loader/>}
            {isFailed && <Message variant='warning'>{message}</Message>}
      <Form onSubmit={onSubmitHandler}>
      <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="enter name"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="enter email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          ></Form.Control>
          
        </Form.Group>
        <Form.Group className="mb-3" controlId="isAdmin">
          <Form.Check
            type="checkbox"
            label="Is Admin"
            checked={isAdmin}
            onChange={(e) => setisAdmin(e.target.checked)}
          ></Form.Check>
          
        </Form.Group>
       
        
        <Button type="submit" variant="primary"> Update
        </Button>
      </Form>
        </FormContainer>
    </div>
    
        
          
   
  )}
  


export default UserEditScreen