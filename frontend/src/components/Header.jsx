import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Route } from 'react-router-dom';
import { Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import Brand from './Brand';
import SearchBox from './SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MediaQueries, { useMediaQuery } from '../hooks/useMediaQuery';
import { logout } from '../redux-slices/userReducer';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.users);
  const { cartItems } = useSelector(state => state.cart);
  const numProductsInCart = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );
  const { isSmallScreen, isMediumScreen } = MediaQueries();
  const logoutHandler = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <header>
      <Navbar className='navbar'>
        <Container>
          <Row className="navAppBarCustom">
            <Col lg={2} xs={2}>
              <LinkContainer to='/'>
                <Navbar.Brand className='appBarBrand' style={{width: '30px'}}>
                  <Brand />
                </Navbar.Brand>
              </LinkContainer>
            </Col>
            <Col lg={4} xs={5}>
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            </Col>
            <Col lg={6} xs={5} className='ml-auto' style={{ marginLeft: 100 }}>
              <Nav variant='dark'>
                <LinkContainer to='/cart'>
                  <Nav.Link style={{ position: 'absolute' }}>
                    <span
                      style={{
                        position: 'relative',
                        top: '-20%',
                        left: '-5%',
                      }}>
                      {numProductsInCart > 0 ? numProductsInCart : ''}
                    </span>
                    <i className='fas fa-shopping-cart'></i> Cart
                  </Nav.Link>
                </LinkContainer>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <i className='fas fa-user'></i> Sign In
                    </Nav.Link>
                  </LinkContainer>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Admin' id='adminmenu'>
                    <LinkContainer to='/admin/userlist'>
                      <NavDropdown.Item>User Management</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/productlist'>
                      <NavDropdown.Item>Product Management</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/orderslist'>
                      <NavDropdown.Item>Order Management</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
