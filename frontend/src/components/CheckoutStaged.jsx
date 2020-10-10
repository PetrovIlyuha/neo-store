import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutStaged = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        textAlign: "center",
      }}
      className='mb-3'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login' className='bg-light checkout-tab'>
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className='bg-light checkout-tab-disabled'>
            Login
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping' className='bg-light checkout-tab'>
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className='bg-light checkout-tab-disabled'>
            Shipping
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment' className='bg-light checkout-tab'>
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className='bg-light checkout-tab-disabled'>
            Payment
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder' className='bg-light checkout-tab'>
            <Nav.Link>Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className='bg-light checkout-tab-disabled'>
            Order
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutStaged;
