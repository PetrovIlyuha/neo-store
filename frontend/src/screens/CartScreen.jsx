import React, { useEffect } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import EmptyCart from '../assets/images/EmptyCart';
import MetaInfo from '../components/MetaInfo';
import {
  addToCart,
  removeFromCart,
} from '../redux-slices/cartReducer';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);

  const quantity = location.search ? +location.search.split('=')[1] : 1;
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, productId, match, quantity]);

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push(`/login?redirect=shipping`);
  };
  return (
    <div className='shopping-cart'>
      <MetaInfo
        title='Your Cart'
        keywords='Shopping cart, neo-store shopping cart, customer page'
      />
      {cartItems.length === 0 ? (
        <div className='screen-center'>
          <h3>Your cart is empty</h3>
          <EmptyCart />
          <Link
            className='btn btn-block back-home-button my-3'
            style={{ width: '140px' }}
            to='/'>
            Back to <i className='fas fa-home'></i>
          </Link>
        </div>
      ) : (
        <Row>
          <Col md={8}>
            <h1 style={{ textAlign: 'center' }}>Your Cart</h1>
            <ListGroup variant='flush'>
              {cartItems.map(item => (
                <ListGroup.Item key={item.product} className='my-2'>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                      $ <strong>{item.price}</strong>
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as='select'
                        value={item.quantity}
                        onChange={e =>
                          dispatch(addToCart(item.product, +e.target.value))
                        }>
                        {[...Array(item.countInStock).keys()].map(value => (
                          <option key={value + 1} value={value + 1}>
                            {value + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        block
                        variant='light'
                        onClick={() => removeFromCartHandler(item.product)}>
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <h4 className='mt-4 text-center'>Order Details</h4>
            <Card className='mt-4'>
              <ListGroup variant='flush' style={{ textDecoration: 'none' }}>
                <ListGroup.Item>
                  <h5>
                    Products in cart: (
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                  </h5>
                  <h6>
                    Total Check:{' '}
                    <span
                      style={{
                        color: 'blue',
                        fontSize: '1rem',

                        fontWeight: 'bold',
                      }}>
                      $
                      {cartItems
                        .reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0,
                        )
                        .toFixed(2)}
                    </span>
                  </h6>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type='button'
                    block
                    variant='light'
                    onClick={checkoutHandler}>
                    Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default CartScreen;
