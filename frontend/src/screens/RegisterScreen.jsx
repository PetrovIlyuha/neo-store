import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import SpinnerLoader from "../components/UIState/SpinnerLoader";
import { toast, ToastContainer } from "react-toastify";
import { register } from "../redux-slices/userReducer";

const RegisterScreen = ({ history, location }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector(state => state.users);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  useEffect(() => {
    toast.error(message);
  }, [message]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const loginFormSubmitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password don't match!");
      return;
    }
    dispatch(register(name, email, password));
  };

  if (loading) return <SpinnerLoader />;

  return (
    <FormContainer>
      <h2 className='top-heading text-center'>Sign In</h2>
      <Form
        className='bg-danger p-3 login-form'
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
        <Button type='submit'>Register</Button>
        <Row className='py-3'>
          <Col>
            Have an account?
            <Link
              style={{ color: "#58F37A" }}
              to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              {" "}
              Sign Up
            </Link>
          </Col>
        </Row>
      </Form>
      <ToastContainer />
    </FormContainer>
  );
};

export default RegisterScreen;
