import React from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import CheckoutStaged from "../components/CheckoutStaged";

const Placement = ({ history }) => {
  const dispatch = useDispatch();
  const {
    cartItems,
    shippingAddress: { address, city, postalCode, country },
    paymentMethod,
  } = useSelector(state => state.cart);

  let totalOrderPayment = cartItems.reduce(
    (total, item) => item.price * item.quantity + total,
    0,
  );

  let totalShippingPrice = totalOrderPayment => {
    if (totalOrderPayment < 500) {
      return totalOrderPayment * 0.1;
    } else if (totalOrderPayment < 1000) {
      return totalOrderPayment * 0.075;
    } else if (totalOrderPayment > 1000) {
      return totalOrderPayment * 0.03;
    }
  };

  let totalOrderCostAfterShipping = (
    totalOrderPayment + totalShippingPrice(totalOrderPayment)
  ).toFixed(2);

  return (
    <>
      <CheckoutStaged step1 step2 step3 step4 />
      <Row>
        <Col md={8} className='mt-4'>
          <ListGroup variant='flush' onClick={() => history.push("/shipping")}>
            <ListGroup.Item>
              <h4>Order will be shipped to:</h4>
              <p>
                <strong>Address:</strong>
                {address}, {city} {postalCode}, {country}
              </p>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant='flush' className='mt-4'>
            <ListGroup.Item>
              <h5 className='top-heading'>
                Payment Company: <span>{paymentMethod}</span>
              </h5>
            </ListGroup.Item>
          </ListGroup>
          <h5 style={{ textAlign: "center", color: "gray" }} className='mt-3'>
            Your Cart
          </h5>
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product} className='my-2'>
                <Row>
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
                    <strong>{item.price * item.quantity}</strong>
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
                <h5 style={{ textAlign: "center" }} className='mb-3'>
                  Order Detailed
                </h5>
                <Row>
                  <Col>Items</Col>
                  <Col>
                    <strong>$ {totalOrderPayment}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Cost:</Col>
                  <Col>
                    <strong>
                      $ {totalShippingPrice(totalOrderPayment).toFixed(2)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>
                    <strong>$ {totalOrderCostAfterShipping}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className='btn btn-block bg-light'>Order</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row></Row>
    </>
  );
};

export default Placement;
