import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import SpinnerLoader from "../components/UIState/SpinnerLoader";
import { toast, ToastContainer } from "react-toastify";

const LoginScreen = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector(state => state.userLogin);
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const loginFormSubmitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  if (loading) return <SpinnerLoader />;

  return (
    <FormContainer>
      <h2 className='top-heading text-center'>Sign In</h2>
      <Form
        className='bg-danger p-3 login-form'
        onSubmit={loginFormSubmitHandler}>
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
        <Button type='submit'>Sign In</Button>
        <Row className='py-3'>
          <Col>
            Don't have an account?
            <Link
              style={{ color: "#58F37A" }}
              to={redirect ? `/register?redirect=${redirect}` : "/register"}>
              {" "}
              Register
            </Link>
          </Col>
        </Row>
      </Form>
      <ToastContainer />
    </FormContainer>
  );
};

export default LoginScreen;
