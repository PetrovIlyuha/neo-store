import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import SpinnerLoader from "../components/UIState/SpinnerLoader";
import { toast, ToastContainer } from "react-toastify";

const ProfileScreen = ({ history, location }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);

  const { loading, error, user } = useSelector(state => state.userDetails);
  const { success } = useSelector(state => state.userUpdateProfile);
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  useEffect(() => {
    dispatch(getUserDetails("profile"));
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
        <Form
          className='bg-danger p-3 update-form'
          onSubmit={loginFormSubmitHandler}>
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
        <h2>Orders</h2>
      </Col>
      <ToastContainer />
    </Row>
  );
};

export default ProfileScreen;
