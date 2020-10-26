import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

import Rating from '../components/Rating';
import SpinnerLoader from '../components/UIState/SpinnerLoader';
import ServerError from '../assets/images/ServerError';

// redux functions, actions and constants
import { useDispatch, useSelector } from 'react-redux';
import {
  listProductDetails,
  addProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import MetaInfo from '../components/MetaInfo';

const ProductScreen = ({ history, match }) => {
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState({
    rating: 0,
    comment: '',
  });
  const { rating, comment } = review;

  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    state => state.productDetails,
  );
  const {
    success: addReviewSuccess,
    loading: addReviewLoading,
    error: addReviewError,
  } = useSelector(state => state.productReviewCreate);

  const { userInfo } = useSelector(state => state.userLogin);

  useEffect(() => {
    if (addReviewSuccess) {
      setReview({ rating: 0, comment: '' });
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      setTimeout(() => {
        toast.success('Your review has been created!');
      }, 2000);
    }
    if (addReviewError) {
      setTimeout(() => {
        toast.error('You reviewed this product previously!');
      }, 2000);
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, addReviewSuccess, addReviewError]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?quantity=${quantity}`);
  };

  const reviewSubmitHandler = e => {
    e.preventDefault();
    dispatch(addProductReview(match.params.id, review));
  };

  const setReviewFields = e => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <SpinnerLoader />;
  }

  if (error) {
    return (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}>
        <h2 style={{ color: 'darkgray', marginLeft: -10, textAlign: 'center' }}>
          <span style={{ color: 'red' }}>{error}</span>
          <br />
          We already working on it...
        </h2>
        <ServerError />
      </div>
    );
  }
  return (
    <div>
      <MetaInfo title={product.name} />
      <Link
        className='btn btn-block back-home-button my-3'
        style={{ width: '140px' }}
        to='/'>
        Back to <i className='fas fa-home'></i>
      </Link>
      <Row>
        <Col md={4}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant='flush' bg='light'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating || 3}
                text={`${product.numReviews}`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: ${product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Quantity:</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}>
                        {[...Array(product.countInStock).keys()].map(value => (
                          <option key={value + 1} value={value + 1}>
                            {value + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  className='btn-block cta-button'
                  type='button'
                  disabled={product.countInStock === 0}>
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h4 className='top-heading my-4 text-center'>Product Reviews</h4>
          {!product.reviews.length && (
            <div className='text-center'>
              <Badge variant='info'>
                <h4>No reviews yet</h4>
                <h6>You can leave your review with the form</h6>
              </Badge>
            </div>
          )}
          <ListGroup variant='flush'>
            {product.reviews.map(review => (
              <ListGroup.Item key={review._id} className='mb-3'>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p className='mt-2'>
                  Added: {review.createdAt.substring(0, 10)}
                </p>
                <h5>"{review.comment}"</h5>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4} className='offset-md-1'>
          <h4 className='top-heading text-center'>
            Write your review
            <i
              className='far fa-hand-pointer'
              style={{
                transform: 'rotate(180deg)',
                margin: '1.2rem 0 0 .7rem',
                fontSize: '3.2rem',
              }}></i>
          </h4>
          {userInfo ? (
            <Form onSubmit={reviewSubmitHandler}>
              <Form.Group controlId='rating'>
                <Form.Label style={{ color: 'grey' }}>Rating</Form.Label>
                <Form.Control
                  as='select'
                  value={rating}
                  className='bg-light text-white'
                  name='rating'
                  onChange={setReviewFields}>
                  <option value=''>Select...</option>
                  <option value='1'>1 - Low Quality</option>
                  <option value='2'>2 - Poor Quality</option>
                  <option value='3'>3 - Moderate Quality</option>
                  <option value='4'>4 - Acceptable Quality</option>
                  <option value='5'>5 - Perfect Quality</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='comment'>
                <Form.Label style={{ color: 'grey' }}>Your comment</Form.Label>
                <Form.Control
                  as='textarea'
                  rows='3'
                  className='bg-light text-white'
                  value={comment}
                  onChange={setReviewFields}
                  name='comment'></Form.Control>
              </Form.Group>
              <Button type='submit' variant='warning' className='btn btn-block'>
                Submit
              </Button>
              {addReviewError && (
                <Badge
                  variant='info'
                  style={{ width: '100%', margin: '1.4rem auto' }}>
                  <h6>Let's give other people a chance</h6>
                  <h6>to rate this.</h6>
                </Badge>
              )}
              {addReviewLoading && <SpinnerLoader size='10px' />}
            </Form>
          ) : (
            <div className='text-center'>
              <Badge variant='secondary'>
                <h3>But Please Log in first</h3>
              </Badge>
            </div>
          )}
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default ProductScreen;
