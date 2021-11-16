import React from "react";
import {logout} from "../actions/UserActions";
import {useDispatch,useSelector} from "react-redux";
import {Container, Nav, Navbar, Col, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import SearchBox from "./SearchBox";

function Header(){
    const userLogin = useSelector(state => state.userLogin)
    const  { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())

    }

    return(
        <div>
             <header>
                 <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                      <Container>
                          <LinkContainer to='/'>
                                < Navbar.Brand>Pro sellers</Navbar.Brand>
                          </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                          <SearchBox />
                          <Nav className="ml-auto">
                              <LinkContainer to='/cart'>
                                         <Nav.Link ><i className='fas fa-shopping-cart' />Cart</Nav.Link>
                              </LinkContainer>

                              {userInfo ? (
                                  <NavDropdown id='username' title={userInfo.name}>
                                  <LinkContainer to='/profile'>
                                      <NavDropdown.Item>Profile</NavDropdown.Item>
                                  </LinkContainer>
                                      <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                  </NavDropdown>
                              ): (
                                  <LinkContainer to='/login'>
                                   <Nav.Link><i className='fas fa-user' />Login</Nav.Link>
                                  </LinkContainer>
                              )}
                              {userInfo && userInfo.isAdmin && (
                                  <NavDropdown title='Admin' id='Adminmenu'>
                                  <LinkContainer to='/admin/userlist'>
                                      <NavDropdown.Item>Users</NavDropdown.Item>
                                  </LinkContainer>
                                  <LinkContainer to='/admin/productlist'>
                                      <NavDropdown.Item>Products</NavDropdown.Item>
                                  </LinkContainer>
                                  <LinkContainer to='/admin/orderlist'>
                                      <NavDropdown.Item>Orders</NavDropdown.Item>
                                  </LinkContainer>

                                </NavDropdown>


                              )}


                          </Nav>
                        </Navbar.Collapse>
                      </Container>
                 </Navbar>

             </header>
        </div>

    )
}
export default Header