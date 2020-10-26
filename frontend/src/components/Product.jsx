import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button, Card } from 'react-bootstrap';
import Rating from './Rating';
import { addToCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [countToAdd, setCountToAdd] = useState(0);
  const [showCountIndicator, setShowCountIndicator] = useState(false);
  const { cartItems } = useSelector(state => state.cart);

  const productQuantityInCart = cartItems.filter(
    item => item.product === product._id,
  )[0]?.quantity;

  const showCountNumber = () => {
    setShowCountIndicator(true);
    setTimeout(() => {
      setShowCountIndicator(false);
    }, 3400);
  };
  const addToCartFormMainScreen = product => {
    dispatch(addToCart(product._id, countToAdd));
  };

  useEffect(() => {
    showCountNumber();
  }, [countToAdd]);

  return (
    <Card className='my-5 p-3 rounded product_card' text='dark'>
      {!product.countInStock && (
        <Badge variant='warning' className='product_card_badge'>
          Out of Stock
        </Badge>
      )}
      <Link to={`/product/${product._id}`}>
        <div className='image_wrapper'>
          <Card.Img
            src={product.image}
            variant='bottom'
            className='productImage'
          />
        </div>
      </Link>
      <Card.Body className='product_card_body'>
        <a href={`/product/${product._id}`}>
          <Card.Title as='div' className='productNameBox'>
            <strong className='productName'>{product.name}</strong>{' '}
          </Card.Title>
        </a>
        <Card.Text as='div'>
          <div className='my-3'>
            <Rating value={product.rating} text={`${product.numReviews}`} />
          </div>
        </Card.Text>
        <section className='d-flex' justify='space-around' align='center'>
          <Card.Text as='h3'>${product.price}</Card.Text>
          <Button
            variant='info'
            className='ml-3 p-2'
            onClick={() => addToCartFormMainScreen(product)}>
            {productQuantityInCart ? (
              <>
                In Cart <i className='fas fa-cart-arrow-down'></i>
                <span> {productQuantityInCart}</span>
              </>
            ) : (
              <>
                Add To <i className='fas fa-cart-arrow-down'></i>
              </>
            )}
          </Button>
          <div
            className='ml-1'
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <Button
              style={{ position: 'relative' }}
              variant='success'
              onMouseEnter={showCountNumber}
              onClick={() => setCountToAdd(countToAdd => countToAdd + 1)}>
              +{' '}
              {showCountIndicator && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-110%',
                    left: '10%',
                    fontSize: '1.4rem',
                    color: '#85C24F',
                    padding: '5px 9px',
                    backgroundColor: '#363B61',
                    lineHeight: '20px',
                    borderRadius: '10%',
                  }}>
                  {countToAdd}
                </span>
              )}
            </Button>
            <Button
              variant='danger'
              className='mt-1'
              onMouseEnter={showCountNumber}
              onClick={() => {
                if (countToAdd > 0) {
                  setCountToAdd(countToAdd => countToAdd - 1);
                }
              }}>
              -
            </Button>
          </div>
        </section>
      </Card.Body>
    </Card>
  );
};

export default Product;
