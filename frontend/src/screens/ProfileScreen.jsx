import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { showMyOrders } from "../actions/orderActions";
import SpinnerLoader from "../components/UIState/SpinnerLoader";
import { toast, ToastContainer } from "react-toastify";
import { format } from "date-fns";
const ProfileScreen = ({ history, location }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);

  const { loading, error, user } = useSelector(state => state.userDetails);
  const { loading: loadingMyOrders, orders } = useSelector(
    state => state.orderMyOrders,
  );
  const { success } = useSelector(state => state.userUpdateProfile);
  // const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  useEffect(() => {
    dispatch(getUserDetails("profile"));
    dispatch(showMyOrders());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    toast.error(message);
  }, [message]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success("Profile was updated!");
    }
  }, [success]);

  const loginFormSubmitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords should be the same!");
    }
    dispatch(updateUserProfile({ id: user._id, name, email, password }));
  };

  if (loading) return <SpinnerLoader />;

  return (
    <Row>
      <Col md={5}>
        <h3 className='top-heading text-center'>User Profile</h3>
        <Form className='p-3 update-form' onSubmit={loginFormSubmitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Your name'
              value={name}
              onChange={e => setName(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='@Email'
              value={email}
              onChange={e => setEmail(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={e => setPassword(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}></Form.Control>
          </Form.Group>
          <Button type='submit' className='btn-block bg-light'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={7}>
        <h2 className='top-heading text-center'>Orders</h2>
        {loadingMyOrders && <SpinnerLoader />}

        <Table striped bordered hover responsive className='table-sm bg-light'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Total Payment</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  {/* <td>{typeof order.createdAt}</td> */}
                  <td>{format(new Date(order.createdAt), "yyyy-MM-dd")}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? order.paidAt.substring(0, 10) : "Not Paid"}
                  </td>
                  <td>{order.isDelivered ? "Delivered" : "Delivering"}</td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='dark'>Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Col>
      <ToastContainer />
    </Row>
  );
};

export default ProfileScreen;
