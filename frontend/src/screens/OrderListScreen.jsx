import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import SpinnerLoader from '../components/UIState/SpinnerLoader';
import { toast, ToastContainer } from 'react-toastify';

import { getAllOrders } from '../actions/orderActions';
import { ORDER_ALL_RESET } from '../constants/orderConstants';

const OrderListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector(state => state.allOrders);
  const { userInfo } = useSelector(state => state.userLogin);

  useEffect(() => {
    if (!userInfo.isAdmin) {
      toast.error('You are not Authorized to access the Panel!');
      history.push('/login');
    }
    dispatch(getAllOrders());

    return () => {
      dispatch({ type: ORDER_ALL_RESET });
    };
  }, [dispatch, history, userInfo]);

  if (loading) {
    return <SpinnerLoader />;
  }

  if (error) {
    toast.error(error);
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col className='bg-light m-3 skewed_dark__background text-center'>
          <h3>All Orders</h3>
        </Col>
      </Row>
      <Table striped bordered hover responsive className='table-sm bg-light'>
        <thead className='text-center'>
          <tr className='table_header'>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Order Price</th>
            <th>Was Paid</th>
            <th>Was Delivered</th>
            <th>View Order Details</th>
          </tr>
        </thead>
        <tbody className='table_body'>
          {orders.map(order => (
            <tr key={order._id}>
              <td style={{ color: 'lightgreen' }}>{order._id}</td>
              <td style={{ color: 'lightgreen' }}>
                {order.user && order.user.name}
              </td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td className='text-center'>${order.totalPrice}</td>
              <td className='text-center'>
                {order.isPaid ? (
                  order.paidAt.substring(0, 10)
                ) : (
                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                )}
              </td>
              <td className='text-center'>
                {order.isDelivered ? (
                  order.deliveredAt.substring(0, 10)
                ) : (
                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                )}
              </td>
              <td>
                <LinkContainer to={`/order/${order._id}`}>
                  <Button variant='warning' className='btn btn-sm btn-warning'>
                    Details
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
    </>
  );
};

export default OrderListScreen;
