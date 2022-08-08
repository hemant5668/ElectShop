import React, { useEffect } from "react";
import { Container,Navbar,Nav, ListGroupItem, ListGroup, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { logout } from "../store/cart-actions";
import { useNavigate } from "react-router-dom";
import Searchbox from "./Searchbox";

function Header() {
  const {userInfo,isSucess}=useSelector(state=>state.login)
  const dispatch=useDispatch()
  const history=useNavigate()
  

  const onLogOutHandler=()=>{
        dispatch(logout())
        history("/")
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
          <Navbar.Brand >ElectShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to='/cart'>
              <Nav.Link ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
              </LinkContainer>

            {userInfo?
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={onLogOutHandler}> Logout</NavDropdown.Item>
              </NavDropdown>
              :
              <LinkContainer to='/login'>
              <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
              </LinkContainer>
            }

            {userInfo && userInfo.isAdmin ?
            <NavDropdown title='admin' id="admin">

              <LinkContainer to='/admin/userlist'>
              <NavDropdown.Item>Admin</NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to='/admin/productlist'>
              <NavDropdown.Item>Products</NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to='/admin/orderslist'>
              <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>

            </NavDropdown> :""}
            
            
      <Searchbox/>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
