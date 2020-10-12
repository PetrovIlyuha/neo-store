import React from "react";
import { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutStaged from "../components/CheckoutStaged";

const Placement = ({ history }) => {
  const dispatch = useDispatch();
  const {
    cartItems,
    shippingAddress: { address, city, postalCode, country },
    paymentMethod,
  } = useSelector(state => state.cart);
  const { shippingAddress } = useSelector(state => state.cart);
  const { order, success, error } = useSelector(state => state.orderCreate);

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
  let orderTaxation = totalOrderPayment * 0.04;

  let totalOrderCostAfterShippingAndTaxes = (
    totalOrderPayment +
    totalShippingPrice(totalOrderPayment) +
    orderTaxation
  ).toFixed(2);

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    if (error) {
      toast.error(error);
    }
    // eslint-disable-next-line
  }, [history, success, error]);

  const placeOrderHandler = () => {
    console.log(
      cartItems,
      shippingAddress,
      paymentMethod,
      totalOrderPayment,
      totalShippingPrice(totalOrderPayment),
      +orderTaxation.toFixed(2),
      +totalOrderCostAfterShippingAndTaxes,
    );

    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: +totalOrderPayment.toFixed(2),
        shippingPrice: +totalShippingPrice(totalOrderPayment).toFixed(2),
        taxPrice: +orderTaxation.toFixed(2),
        totalPrice: +totalOrderCostAfterShippingAndTaxes,
      }),
    );
  };
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
                Payment Provider: <span>{paymentMethod}</span>
              </h5>
            </ListGroup.Item>
          </ListGroup>
          <h5 style={{ textAlign: "center", color: "gray" }} className='mt-3'>
            Your Cart
          </h5>
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product} className='my-1'>
                <Row className='checkout-product-details'>
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
                    <strong>{(item.price * item.quantity).toFixed(2)}</strong>
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
                    <strong>$ {totalOrderPayment.toFixed(2)}</strong>
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
                  <Col>Tax:</Col>
                  <Col>
                    <strong>$ {orderTaxation.toFixed(2)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>
                    <strong>$ {totalOrderCostAfterShippingAndTaxes}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  onClick={placeOrderHandler}
                  className='btn btn-block bg-light'>
                  Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </>
  );
};

export default Placement;
