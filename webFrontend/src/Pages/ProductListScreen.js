import React from "react";
import { useEffect} from "react";
import {  Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/UI/Message";
import Loader from "../components/UI/Loader";
import { fetchProductsData,deleteProduct} from "../store/cart-actions";
import {LinkContainer} from 'react-router-bootstrap'
import {useNavigate} from 'react-router-dom'

function ProductListScreen() {

    const {isLoading,isSuccces,isFailed,products,message}=useSelector(state=>state.product)
    const {msgbox,isSucess,isFailed1,deletedProduct}=useSelector(state=>state.deleteproduct)
  
    const {userInfo}=useSelector(state=>state.login)


    const dispatch=useDispatch()
    const history=useNavigate()

    useEffect(()=>{
        if(!userInfo && !userInfo.isAdmin){
            history("/login")
          }
        if(!isSuccces){
          dispatch(fetchProductsData())
        }  
        },[dispatch,userInfo,history,isSuccces])
        
        
        
        const onDeleteHandler=(e,id)=>{
          if (window.confirm("Are you sure you want to delete this user?")){
            e.preventDefault()
            dispatch(deleteProduct(id))
            history("/")
        }
    }

  return (
    <div>
        <Row>

        <Col md={9}><h1>Products</h1> </Col>
        <Col md={2}><LinkContainer to={`/admin/productlist/createnew`}>
                                         <h2>
                                             <Button variant='dark' className="btn-md"><i  className='fas fa-plus' ></i> Create Product</Button> 
                                        </h2>
                                        </LinkContainer> </Col>
        </Row>
        {isFailed1 &&<Message variant='danger'>{msgbox}</Message> }
    <Row>
          {isLoading ? (<Loader/>)
                    : isFailed ? 
                    (<Message variant='danger'>{message}</Message>) 
                    :(  <Table striped responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>EDIT</th>
              <th>dELETE</th>
            </tr>
          </thead>
          <tbody>
            
           {products.map((product,index=1)=>(<tr key={index}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.category}</td>
                                        <td>{product.price}</td>
                                        <td>{product.countInStock}</td>
                                        <td>
                                        <LinkContainer to={`/admin/productlist/${product._id}/edit`}>
                                          <Button variant='light' className="btn-md"><i  className='fas fa-edit' ></i></Button> 
                                        </LinkContainer>
                                          </td>
                                          <td>
                                            <Button variant="dark" className="fas fa-trash" type='btn' onClick={(e)=>onDeleteHandler(e,product._id)}></Button>
                                            </td>  
                                    </tr>)
           )}
          </tbody>
        </Table>)}
    </Row>
        
        
           </div>
  )
}

export default ProductListScreen