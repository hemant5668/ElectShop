import React from "react";
// import products from "../Products";
import { fetchSingleProductdata } from "../store/cart-actions";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/UI/Loader";
import Message from "../components/UI/Message";
import FormContainer from "../components/UI/FormContainer";
import { updateProduct } from "../store/cart-actions";

function EditProductScreen() {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [brand, setbrand] = useState("");
  const [rating, setrating] = useState("");
  const [price, setprice] = useState("");
  const [numReviews, setnumReviews] = useState("");
  const [category, setcategory] = useState("");
  const [countInStock, setcountInStock] = useState("");
  const [image, setimage] = useState([]);

  const dispatch = useDispatch();
  const params = useParams();
  const prod_ID = params.id;
  let history = useNavigate();

  const Xproduct = useSelector((state) => state.singleProduct);
  const { product, message, isFailed, isLoading } = Xproduct;

  useEffect(() => {
    if (product._id != prod_ID) dispatch(fetchSingleProductdata(prod_ID));
    else {
      setname(product.name);
      setcategory(product.category);
      setcountInStock(product.countInStock);
      setdescription(product.description);
      setprice(product.price);
      setnumReviews(product.numReviews);
      setrating(product.rating);
      setbrand(product.brand);
      // setimage(product.image);
    }
  }, [prod_ID, product, dispatch]);

  const data={
        name:name,
        description:description,
        brand:brand,
        price:price,
        category:category,
        countInStock:countInStock,
        image:image
  }

  const onEditProductHandler = (event) => {
    event.preventDefault()
    console.log("update")
    dispatch(updateProduct(data,prod_ID))
    history(`/`);
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go back
      </Link>
      {isLoading ? (
        <Loader />
      ) : isFailed ? (
        <Message>{message}</Message>
      ) : (
        <Form onSubmit={onEditProductHandler}>
        <Row>
          
          <Col md={6}>
          <Form.Group className="mb-3" controlId="productname">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter productname"
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
            onChange={(e) => setdescription(e.target.value)}
          ></Form.Control>

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

        </Form.Group>
          <Form.Group className="mb-3" controlId="brand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter brand name"
            value={brand}
            onChange={(e) => setbrand(e.target.value)}
          ></Form.Control>
        </Form.Group>
        
          <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter category name"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          ></Form.Control>
        </Form.Group>

          <Form.Group className="mb-3" controlId="countInStock">
          <Form.Label>Count in Stock</Form.Label>
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

              <ListGroup.Item>
                Rating: <Rating
                  value={rating}
                  text={`${numReviews}Reviews`}
                  color="#f8e825"
                />
              </ListGroup.Item>
                    
    <ListGroup>
    <button className="btn-block" type="submit">Update</button>
        </ListGroup>          

          </Col>
          
        
        </Row>
        </Form>
      )}
    </div>
  );
}

export default EditProductScreen;
