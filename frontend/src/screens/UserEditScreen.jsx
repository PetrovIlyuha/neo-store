import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import SpinnerLoader from "../components/UIState/SpinnerLoader";
import { toast, ToastContainer } from "react-toastify";

const UserEditScreen = ({ history, match }) => {
  const userId = match.params.id;
  const [userFields, setUserFields] = useState({
    name: "",
    email: "",
    isAdmin: false,
  });

  const { name, email, isAdmin } = userFields;

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector(state => state.userDetails);

  useEffect(() => {
    if (!user || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      const { name, email, isAdmin } = user;
      setUserFields({ name, email, isAdmin });
    }
  }, [user, dispatch, userId]);

  const onUserDataChangeHandler = e => {
    if (e.target.name === "isAdmin") {
      setUserFields({ ...userFields, [e.target.name]: e.target.checked });
    } else {
      setUserFields({ ...userFields, [e.target.name]: e.target.value });
    }
  };

  const loginFormSubmitHandler = e => {
    e.preventDefault();
    console.log(userFields);
    // dispatch();
  };

  if (loading) return <SpinnerLoader />;

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Back to admin panel
      </Link>
      <FormContainer>
        <h2 className='top-heading text-center'>Update User Account Info</h2>
        <Form
          className='bg-danger p-3 login-form'
          onSubmit={loginFormSubmitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>User name</Form.Label>
            <Form.Control
              type='text'
              placeholder="User's name"
              name='name'
              value={name}
              onChange={onUserDataChangeHandler}></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>User Email address</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='@'
              value={email}
              onChange={onUserDataChangeHandler}></Form.Control>
          </Form.Group>
          <Form.Group controlId='isadmin'>
            <Form.Check
              type='checkbox'
              label='Admin (true/false)'
              checked={isAdmin}
              name='isAdmin'
              onChange={onUserDataChangeHandler}></Form.Check>
          </Form.Group>
          <Button type='submit'>Update User Info</Button>
        </Form>
        <ToastContainer />
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
