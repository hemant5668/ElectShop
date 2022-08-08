import React from "react";
import { useState } from "react";
import { Form,Button } from "react-bootstrap";
import FormContainer from "../components/UI/FormContainer";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import {addShippingData} from "../store/cart-actions";

function ShippingScreen() {

    const dispatch=useDispatch()
    const history=useNavigate()

    const {shippingDetails}=useSelector(state=>state.cart)

    const [address, setaddress] = useState(shippingDetails.address)
    const [city, setcity] = useState(shippingDetails.city)
    const [postalcode, setpostalcode] = useState(shippingDetails.postalcode)
    const [country, setcountry] = useState(shippingDetails.country)

    const onSubmitHandler=(e)=>{
        e.preventDefault()
        dispatch(addShippingData({
            'address':address,
            'city':city,
            'postalcode':postalcode,
            'country':country
        })
        )
        history('/payment')
    }

  return (
    <FormContainer>
        <h1>Shipping Details</h1>
        <ProgressBar step1 step2></ProgressBar>
        <Form onSubmit={onSubmitHandler}>

        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="enter address"
            value={address?address:''}
            onChange={(e) => setaddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="enter city"
            value={city?city:''}
            onChange={(e) => setcity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="postalCode">
          <Form.Label>PostalCode</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="enter postalcode"
            value={postalcode?postalcode:''}
            onChange={(e) => setpostalcode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="enter country"
            value={country?country:''}
            onChange={(e) => setcountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
            Continue
        </Button>

        </Form>

    </FormContainer>
  )
}

export default ShippingScreen