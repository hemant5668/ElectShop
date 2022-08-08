import React from "react";
import { useEffect} from "react";
import {  Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/UI/Message";
import Loader from "../components/UI/Loader";
import { getAllOrders} from "../store/cart-actions";
import {LinkContainer} from 'react-router-bootstrap'
import {useNavigate} from 'react-router-dom'

function ListOrderScreen() {
    const {orderList,isSucess,isLoading,isFailed,message}=useSelector(state=>state.allOrders)

    const {userInfo}=useSelector(state=>state.login)


    const dispatch=useDispatch()
    const history=useNavigate()

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(getAllOrders())
        }
        else{
            history("/login")
        }
    },[dispatch,userInfo,history])

  return (
    <Row>
        <Col ><h1>All Orders</h1> 
          {isLoading ? (<Loader/>)
                    : isFailed ? 
                    (<Message variant='danger'>{message}</Message>) 
                   :(  <Table striped responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            
           {orderList.map((order,index=1)=>(<tr key={index}>
                                        <td>{order._id}</td>
                                        <td>{order.user.username}</td>
                                        <td>{order.createdAt}</td>
                                        <td>{order.totalPrice}</td>
                                        
                                        <td>{order.isPaid?(<i className="fas fa-check" style={{color:"green"}}></i>):<i className="fas fa-times" style={{color:"red"}}></i> }</td>
                                        
                                        <td>{order.isDelivered?(<i className="fas fa-check" style={{color:"green"}}></i>):<i className="fas fa-times" style={{color:"red"}}></i> }</td>
                                        <td>
                                        <LinkContainer to={`/order/${order._id}/`}>
                                          <Button variant='light' className="btn-md"><i  className='fas fa-edit' ></i></Button> 
                                        </LinkContainer>
                                          </td>
                                           
                                    </tr>)
           )}
          </tbody>
        </Table>)}
        </Col>
    </Row>
  )
}

export default ListOrderScreen