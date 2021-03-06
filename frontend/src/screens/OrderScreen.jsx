import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { format } from 'date-fns';

import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import SpinnerLoader from '../components/UIState/SpinnerLoader';
import AlertMessage from '../components/UIState/AlertMessage';
import { getOrderDetails, payOrder, deliverOrder } from '../redux-slices/ordersReducer';

const OrderScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const {
    loadingPayment,
    successPayment,
    successDelivery,
    loadingDelivery,
    order,
    detailsLoading,
    detailsSuccess,
    error,
  } = useSelector(state => state.orders);
  const { userInfo } = useSelector(state => state.users);
  const [sdkReady, setSdkReady] = useState(false);
  const orderId = match.params.id;

  useEffect(() => {
    if (!userInfo) history.push('/login');
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPayment || successDelivery) {
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
    // es-lint-disable-next-line
  }, [dispatch, orderId, order, successPayment, successDelivery]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const successPaypalHandler = paymentResult => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const productDeliveryHandler = () => {
    dispatch(deliverOrder(order._id));
  };
  return (
    <>
      {detailsLoading ? (
        <SpinnerLoader />
      ) : (
        <>
          <h3 className='top-heading' style={{ textAlign: 'center' }}>
            ORDER № {match.params.id}
          </h3>
          <Row>
            <Col md={8} className='mt-4'>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h4>Order will be shipped to:</h4>
                  <p>
                    <strong>Address:</strong>
                    {order.shippingAddress.address},{' '}
                    {order.shippingAddress.city}{' '}
                    {order.shippingAddress.postalCode},{' '}
                    {order.shippingAddress.country}
                  </p>
                  {order.deliveredAt ? (
                    <AlertMessage variant='success'>
                      Send To Delivery: {order.deliveredAt.substring(0, 10)}
                    </AlertMessage>
                  ) : (
                    <AlertMessage variant='secondary'>
                      Delivery Status: Not Delivered Yet
                    </AlertMessage>
                  )}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant='flush' className='mt-4'>
                <ListGroup.Item>
                  <h5 className='top-heading'>
                    Payment Provider: <span>{order.paymentMethod}</span>
                  </h5>
                  {order.isPaid ? (
                    <AlertMessage variant='success'>
                      Payment Status: Paid at{' '}
                      {format(new Date(order.paidAt), 'yyyy-MM-dd')}
                    </AlertMessage>
                  ) : (
                    <AlertMessage variant='secondary'>
                      Payment Status: Not paid
                    </AlertMessage>
                  )}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup>
                <ListGroup.Item>
                  <h6 className='top-heading'>
                    Created: {format(new Date(order.createdAt), 'yyyy-MM-dd')}
                  </h6>
                  <strong>Name:</strong> {order.user.name}
                  <br />
                  <strong>Registration Email:</strong>{' '}
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant='flush'>
                {order.orderItems.map(item => (
                  <ListGroup.Item key={item.product} className='my-1'>
                    <Row className='checkout-product-details'>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3} className='d-flex align-items-center'>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>
                        Qantity <strong>{item.quantity}</strong>
                      </Col>
                      <Col md={1} style={{ marginLeft: 40 }}>
                        <span>SubTotal:</span>$
                        <strong>
                          {(item.price * item.quantity).toFixed(2)}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col md={4} className='mt-4'>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h5 style={{ textAlign: 'center' }} className='mb-3'>
                      Order Detailed
                    </h5>
                    <Row>
                      <Col>Items</Col>
                      <Col>
                        <strong>$ {order.itemsPrice}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping Cost:</Col>
                      <Col>
                        <strong>$ {order.shippingPrice}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax:</Col>
                      <Col>
                        <strong>$ {order.taxPrice}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total:</Col>
                      <Col>
                        <strong>$ {order.totalPrice}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && (
                    <ListGroup.Item>
                      {loadingPayment && <SpinnerLoader />}
                      {!sdkReady ? (
                        <SpinnerLoader />
                      ) : (
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaypalHandler}
                        />
                      )}
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
              {loadingDelivery && <SpinnerLoader size='30' />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={productDeliveryHandler}>
                      Send to Delivery Dep
                    </Button>
                  </ListGroup.Item>
                )}
            </Col>
          </Row>
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default OrderScreen;
