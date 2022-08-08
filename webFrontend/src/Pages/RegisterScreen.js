import React from "react";
import { useState, useEffect } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { Link,useLocation,useNavigate } from "react-router-dom";
import Loader from "../components/UI/Loader";
import Message from "../components/UI/Message";
import FormContainer from "../components/UI/FormContainer";
import { useDispatch,useSelector } from "react-redux";
import {registerUser} from "../store/cart-actions";

function RegisterScreen() {

    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [password, setpassword] = useState("");
    const [messageCos, setmessageCos] = useState(null);
  
    const dispatch=useDispatch()
    const history=useNavigate()
  
    const userRegister=useSelector(state=>state.register)
    const {userInfo,isFailed,message,isloading}=userRegister

    const location= useLocation()
    const redirect= location.search?location.search.split('=')[1]:'/'
  
      useEffect(()=>{
          if (userInfo){
              history(redirect)
          }
      },[redirect,userInfo,history])
  
  
    const onSubmitHandler = (event) => {
      event.preventDefault();
        if (password===confirmPassword){
            dispatch(registerUser(username,email,password))
        }else{
            setmessageCos("password does'nt match")
        }
    };
  

  return (
    <FormContainer>
      <h1>Register</h1>
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
            required
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
           required
            type="Confirm password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
        Already have an Account? <Link to={redirect ? `/login?redirect=${redirect}`:'/login'}>Login here</Link>
        </Col>
      </Row>
      </FormContainer>

  )
}

export default RegisterScreen