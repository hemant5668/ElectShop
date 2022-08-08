import React from "react";
// import products from "../Products";
import { fetchSingleProductdata,sendcomment,resetreview } from "../store/cart-actions";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/UI/Loader";
import Message from "../components/UI/Message";

function ProductScreen() {
  const dispatch = useDispatch();
  // const [product, setproduct] = useState([])
  const [qty, setqty] = useState(1);
  const [rating, setrating] = useState(0);
  const [comment, setcomment] = useState('');

  const params = useParams();
  let history = useNavigate();

  const Xproduct = useSelector((state) => state.singleProduct);
  const { product,isSuccces ,message, isFailed, isLoading } = Xproduct;
  const reviewComm=product.review

  const {userInfo}=useSelector(state=>state.login)
  const {comments,reviewisSucess,reviewisFailed,reviewisLoading,reviewmessage}=useSelector(state=>state.createreview)
  // const product = products.find((product) => product._id === params.Product_Id);
  useEffect(() => {
    
      dispatch(fetchSingleProductdata(params.Product_Id));
    
    // cnst fetchproduct=async ()=>{
      if (reviewisSucess){
        setrating(0)
        setcomment('')
        
      }
    //   const {data}=await axios.get(`/api/products/${params.Product_Id}`)
    //   console.log(data)

    //   setproduct(data)
  }, [params.Product_Id, dispatch,reviewisSucess]);

  const onChangeHandler = (event) => {
    setqty(event.target.value);
  };
  const onAddToCartHandler = () => {
    history(`/cart/${params.Product_Id}/?qty=${qty}`);
  };

  const res={'rating':rating,'comment':comment}
  const onCommentHandler=(e)=>{
    e.preventDefault()
    dispatch(sendcomment(res,params.Product_Id))
  }

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go back
      </Link>
      {isLoading ? (
        <Loader />
      ) : !isSuccces ? (
        <Message>{message}</Message>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <Image src={product.image} />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews}Reviews`}
                    color="#f8e825"
                  />
                </ListGroup.Item>
              </ListGroup>
              <ListGroup>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              </ListGroup>
              <ListGroup>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "InStock" : "OutofStock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty:</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={onChangeHandler}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (item) => (
                                <option key={item + 1} value={item + 1}>
                                  {item + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Row>
                      <button
                        onClick={onAddToCartHandler}
                        className="btn-block"
                        disabled={product.countInStock <= 0}
                        type="button"
                      >
                        Add to Cart
                      </button>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <div className="container mt-6">
            <div className="d-flex justify-content-center row">
              <div className="col-md-15">
                <h1>Reviews</h1>
                <div className="d-flex flex-column comment-section">
                {reviewComm.length===0 ? <Message variant='warning'>'No reviews on the Product</Message>:
                  (reviewComm.map((review,index=0) =>(

                    <div key={index} className="bg-white p-2">
                    <div className="d-flex flex-row user-info">
                      <div className="d-flex flex-column justify-content-start ml-2">
                        <span className="d-block font-weight-bold name">
                          {review.name}
                        </span>
                        <span className="date text-black-50">
                          {review.createdAt}
                        </span>
                        <span >
                         <Rating value={review.rating} color="#f8e825"></Rating>  
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="border border-primary" >
                         {review.comment}
                      </p>
                    </div>
                  </div>
                  )))}
                <h2>Write your Comment here</h2>
                {reviewisLoading && <Loader></Loader>}
                {reviewisSucess && <Message variant='success'>{comments}</Message>}
                {reviewisFailed && <Message variant='failed'>{reviewmessage}</Message>}
                {userInfo ? (
                  <Form onSubmit={onCommentHandler}>
                    <div className="dropdown" style={{'margin-bottom':10}}>

                    <Form.Group controlId="rating">
                      <Form.Control as='select' value={rating} required onChange={(e)=>setrating(e.target.value)}>
                        <option value=''>Select...</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Excellent</option>
                        <option value='5'>5 - Superb</option>
                      </Form.Control>
                    </Form.Group>
                    </div>

                    <Form.Group controlId="comment" >
                    <div className="bg-light p-2">
                    <div className="d-flex flex-row align-items-start"><textarea required value={comment} onChange={(e)=>setcomment(e.target.value)} className="form-control ml-1 shadow-none textarea"></textarea></div>
                    <div className="mt-2 text-right"><button className="btn btn-primary btn-sm shadow-none" type="submit">Post comment</button></div>
                    </div>

                    </Form.Group>

                  </Form>
                ):
                <Message variant='info'>Please <Link to={'/login'}>Login</Link> to comment </Message>
                }

                  
              </div>
            </div>
          </div>
        </div>
    </div>)}
    </div>
  );
}

export default ProductScreen;
