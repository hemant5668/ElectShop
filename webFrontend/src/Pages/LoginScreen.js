import React from "react";
import { useState, useEffect } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { Link,useLocation,useNavigate } from "react-router-dom";
import Loader from "../components/UI/Loader";
import Message from "../components/UI/Message";
import FormContainer from "../components/UI/FormContainer";
import { useDispatch,useSelector } from "react-redux";
import { login } from "../store/cart-actions";

function LoginScreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  

  const dispatch=useDispatch()
  const history=useNavigate()

  const userLogin=useSelector(state=>state.login)
  const {userInfo,isFailed,message,isloading}=userLogin

  const location= useLocation()
  const redirect= location.search?location.search.split('=')[1]:'/'

    useEffect(()=>{
        if (userInfo){
            history(redirect)
        }
    },[redirect,userInfo,history,isFailed])


  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(login(email,password))
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {isFailed && <Message variant='warning'>{message}</Message>}
      {isloading && <Loader/>}
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
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
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
        NewCustomer? <Link to={redirect ? `/register?redirect=${redirect}`:'/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
