import React from 'react'
import {Row,Col} from 'react-bootstrap'
// import products from '../Products'
import Product from '../components/Product'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import { fetchProductsData } from '../store/cart-actions'
import Loader from '../components/UI/Loader'
import Message from '../components/UI/Message'
import { useNavigate,useLocation } from 'react-router-dom';

function HomeScreen() {
  const dispatch=useDispatch()
  const xproducts=useSelector(state=>state.product)
  const {products,message,isFailed,isLoading}=xproducts
    // const [products, setproducts] = useState([])
    const location=useLocation()
    const keyword=location.search
    useEffect(() => {
      
      // const fetchdata=async ()=>{
      //   const {data}=await axios.get('/api/products/')    
      //   setproducts(data)
      // }
      // fetchdata()
      dispatch(fetchProductsData(keyword))
    }, [dispatch,keyword])
    
    // const products=[]
  return (
    <div>
        <h3>HomeScreen</h3>
      {isLoading? <Loader/>
                :isFailed?<Message variant='danger'>{message}</Message>
                          :  
    
        <Row>
            {products.map((product)=>
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                 </Col>
            )}
            
        </Row>
      }
    </div>
  )
}

export default HomeScreen