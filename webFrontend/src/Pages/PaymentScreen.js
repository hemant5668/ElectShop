import React from "react";
import { useState } from "react";
import { Form,Button, Col, Row } from "react-bootstrap";
import FormContainer from "../components/UI/FormContainer";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import { savePaymentMethod } from "../store/cart-actions";


function PaymentScreen() {

    const [PaymentMethod, setPaymentMethod] = useState('paypal')

    const history=useNavigate()
    const dispatch=useDispatch()

    const {shippingDetails}=useSelector(state=>state.cart)

    if(!shippingDetails.address){
        history('/login/shipping')
    }
    
    const onSubmitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(PaymentMethod))
        history('/checkout')
    }

  return (
    <FormContainer>
        <ProgressBar step1 step2 step3 />
        <Form onSubmit={onSubmitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
        

                <Form.Check type='radio'
                    label='Paypal or Credit Card'
                    id='paypal'
                    checked
                    name='paymentmethod'
                    onChange={(e)=>{setPaymentMethod(e.target.value)    
                    }}
                    >
                </Form.Check>        
                    
            </Form.Group>
            

            <Button type="submit" variant="primary">Continue..</Button>
            
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen