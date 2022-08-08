import React from 'react'
import {Link} from 'react-router-dom'
import FormContainer from '../components/UI/FormContainer'
import { Row, Col, ListGroup,Form } from "react-bootstrap";
import {useState,useEffect} from 'react'
import { createProduct } from '../store/cart-actions';
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/UI/Message";
import Loader from "../components/UI/Loader";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

function CreateNewProduct() {
    const [name, setname] = useState("");
    const [description, setdescription] = useState("");
    const [brand, setbrand] = useState("");
    const [price, setprice] = useState(0);
    const [category, setcategory] = useState("");
    const [image, setimage] = useState([]);
    const [uploading, setuploading] = useState(false);
    const [countInStock, setcountInStock] = useState(0);

    const {msgbox,isSucess,isFailed}=useSelector(state=>state.editcreate)
    const {userInfo}=useSelector(state=>state.login)



        const dispatch=useDispatch()
        const history=useNavigate()

    useEffect(()=>{
        if(!userInfo && !userInfo.isAdmin){
            history("/login")
        }
    },[userInfo,history] )   

    useEffect(()=>{
        if (isSucess && !isFailed){
            history("/")
        }
    },[isSucess,isFailed])


    const data={
        name:name,
        description:description,
        brand:brand,
        price:price,
        image:image,
        category:category,
        countInStock:countInStock
    }


    const addProductHandler=(e)=>{
        e.preventDefault()
        console.log(data)
        dispatch(createProduct(data))
            
    }

    const uploadfileHandler=async(e)=>{
      const file=e.target.files[0]
      const formData= new FormData()
      formData.append('image',file)
      setuploading(true)
      try{
        const config={
          headers:{
            'content-type':'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
          }       }
          const {data}=await axios.post("/api/products/create/",formData,config)
          console.log(data)
          setuploading(false)
      }
      catch(error){
        setuploading(false)
      }
    }

  return (
    <div>
        <Link to="/" className="btn btn-light my-3">
        Go back
      </Link>
      {isFailed ?<Message variant='warning'>{msgbox}</Message> :(
      <FormContainer>
      <h1>Create New Product</h1>
        <Form onSubmit={addProductHandler}>
        <Row>
          
          <Col>
          <Form.Group className="mb-3" controlId="productname">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter productname"
            required
            value={name}
            onChange={(e) => setname(e.target.value)}
          ></Form.Control>
        </Form.Group>
          <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter description"
            value={description}
            required
            onChange={(e) => setdescription(e.target.value)}
          ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            placeholder="enter image"
            // required
            // value={image}
            onChange={(e)=>{setimage( e.target.files[0])}}>
          </Form.Control>
          {/* {uploading && <Loader/>} */}
        </Form.Group>

          <Form.Group className="mb-3" controlId="brand">


          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter brand name"
            value={brand}
            required
            onChange={(e) => setbrand(e.target.value)}
          ></Form.Control>
        </Form.Group>
        
          <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter category name"
            required
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          ></Form.Control>
        </Form.Group>

          <Form.Group className="mb-3" controlId="Stock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="enter quantity name"
            value={countInStock}
            onChange={(e) => setcountInStock(e.target.value)}
          ></Form.Control>
        </Form.Group>
          <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="enter price"
            value={price}
            onChange={(e) => setprice(e.target.value)}
          ></Form.Control>
        </Form.Group>    

              
                    
    <ListGroup>
    <button className="btn-block" type="submit">Add Product</button>
        </ListGroup>          

          
        </Col>
        </Row>

        </Form>
      </FormContainer>)}
</div>
  )
}

export default CreateNewProduct