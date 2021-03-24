import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutStaged from "../components/CheckoutStaged";
import { saveShippingAddress } from "../redux-slices/cartReducer";

const ShippingScreen = ({ history }) => {
  const { shippingAddress } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [shippingState, setShippingState] = useState({
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country,
  });

  const { address, city, postalCode, country } = shippingState;

  const handleStateChange = e => {
    setShippingState({ ...shippingState, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };
  return (
    <FormContainer className='mt-5'>
      <CheckoutStaged step1 step2 />
      <h4 className='top-heading'>Shipping</h4>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId='address'>
          <Form.Label>Shipping Address</Form.Label>
          <Form.Control
            type='text'
            name='address'
            required
            placeholder='Your shipping address'
            value={address}
            onChange={handleStateChange}></Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            name='city'
            required
            placeholder='Your City'
            value={city}
            onChange={handleStateChange}></Form.Control>
        </Form.Group>
        <Form.Group controlId='address'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            name='postalCode'
            required
            placeholder='Your postal (ZIP) code'
            value={postalCode}
            onChange={handleStateChange}></Form.Control>
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>Shipping Address</Form.Label>
          <Form.Control
            type='text'
            name='country'
            placeholder='Your country'
            required
            value={country}
            onChange={handleStateChange}></Form.Control>
        </Form.Group>
        <Button type='submit' className='btn btn-block bg-light'>
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
