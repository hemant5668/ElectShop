import React from "react";
import { useEffect} from "react";
import {  Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/UI/Message";
import Loader from "../components/UI/Loader";
import { getAllUsers ,deleteUser} from "../store/cart-actions";
import {LinkContainer} from 'react-router-bootstrap'
import {useNavigate} from 'react-router-dom'

function AdminScreen() {

    const {userList,isloading,isFailed,message}=useSelector(state=>state.users)
    const {deleteX,isSucess3,isFailed3}=useSelector(state=>state.deleteUser)
    const {userInfo}=useSelector(state=>state.login)


    const dispatch=useDispatch()
    const history=useNavigate()

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(getAllUsers())
        }
        else{
            history("/login")
        }
    },[dispatch,userInfo,history,deleteX])

    const onDeleteHandler=(e,id)=>{
      if (window.confirm("Are you sure you want to delete this user?")){
          e.preventDefault()
          dispatch(deleteUser(id))
        }
    }

  return (
    <Row>
        <Col md={9}><h1>All Users</h1> 
          {isloading ? (<Loader/>)
                    : isFailed ? 
                    (<Message variant='danger'>{message}</Message>) 
                   :(  <Table striped responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>isAdmin</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            
           {userList.map((user,index=1)=>(<tr key={index}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin?(<i className="fas fa-check" style={{color:"green"}}></i>):<i className="fas fa-times" style={{color:"red"}}></i> }</td>
                                        <td>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                          <Button variant='light' className="btn-md"><i  className='fas fa-edit' ></i></Button> 
                                        </LinkContainer>
                                          </td>
                                          <td>
                                            <Button variant="light" className="fas fa-trash" type='btn' onClick={(e)=>onDeleteHandler(e,user._id)}></Button>
                                            </td>  
                                    </tr>)
           )}
          </tbody>
        </Table>)}
        </Col>
    </Row>
  )
}

export default AdminScreen