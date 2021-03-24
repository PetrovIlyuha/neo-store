import React, { useEffect, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutStaged from "../components/CheckoutStaged";
import { toast, ToastContainer } from "react-toastify";
import { savePaymentMethod } from "../redux-slices/cartReducer";

const PaymentScreen = ({ history }) => {
  const { shippingAddress } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    if (!shippingAddress) {
      history.push("/shipping");
    }
  }, [shippingAddress, history]);

  const handleStateChange = e => {
    setPaymentMethod(e.target.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (paymentMethod === "Stripe") {
      toast.error(
        "We are not processing Stripe currently! Please, use PayPal... ",
      );
      return;
    }
    if (paymentMethod === "") {
      toast.error("You have not selected a payment method");
      return;
    }
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <FormContainer className='mt-5'>
      <CheckoutStaged step1 step2 step3 />
      <h4 className='top-heading mt-5'>Payment Method</h4>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId='paymentMethod'>
          <Form.Label as='legend' className='top-heading mt-4'>
            Select Payment Method
          </Form.Label>

          <Col>
            <Form.Check
              type='radio'
              className='mt-4'
              style={{ color: "black" }}
              label='PayPal or Credit Card (default)'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              onChange={handleStateChange}></Form.Check>
            <Form.Check
              className='mt-4'
              style={{ color: "black" }}
              type='radio'
              label='Stripe (temporarily not working)'
              id='stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={handleStateChange}></Form.Check>
          </Col>
        </Form.Group>
        <Button type='submit' className='btn btn-block bg-light'>
          Submit
        </Button>
      </Form>
      <ToastContainer />
    </FormContainer>
  );
};

export default PaymentScreen;
