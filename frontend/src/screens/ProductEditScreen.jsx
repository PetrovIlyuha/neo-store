import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import SpinnerLoader from '../components/UIState/SpinnerLoader';
import { toast, ToastContainer } from 'react-toastify';
import {
  listProductDetails,
  productUpdateReset,
  updateProduct,
} from '../redux-slices/productReducer';

const ProductEditScreen = ({ history, match }) => {
  const productId = match.params.id;

  const dispatch = useDispatch();
  const {
    productDetailsLoading,
    productDetailsError,
    product,
    productUpdateLoading,
    productUpdateError,
    productUpdateSuccess,
  } = useSelector(state => state.products);

  const [productFields, setProductFields] = useState({
    name: 'Sample name',
    price: 0,
    image: '/images/sample.png',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
    rating: 0,
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
  } = productFields;

  useEffect(() => {
    if (productUpdateSuccess) {
      toast.success('Product was updated!');
      dispatch(productUpdateReset());
      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      }
      if (product && productFields.name === 'Sample name') {
        setProductFields({
          name: product.name,
          price: product.price,
          image: product.image,
          brand: product.brand,
          category: product.category,
          countInStock: product.countInStock,
          numReviews: product.numReviews,
          description: product.description,
          rating: product.rating,
        });
      }
    }
  }, [
    dispatch,
    product,
    productUpdateSuccess,
    productFields.name,
    history,
    productId,
  ]);

  const onProductDetailsChangeHandler = e => {
    setProductFields({ ...productFields, [e.target.name]: e.target.value });
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(updateProduct({ _id: productId, ...productFields }));
  };

  const uploadImageHandler = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploadingImage(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);
      setProductFields({ ...productFields, image: data });
      setUploadingImage(false);
    } catch (err) {}
  };

  if (productDetailsLoading || productUpdateLoading) return <SpinnerLoader />;
  if (productDetailsError) toast.error('Product details request failed!');
  if (productUpdateError) toast.error('Product update failed! Try again');

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-2'>
        Back to admin panel
      </Link>
      <FormContainer>
        <h2 className='top-heading text-center'>Update Product Info</h2>
        <Form
          className='p-4 mb-5 product_update__form'
          onSubmit={submitHandler}>
          <Row>
            <Col>
              <Form.Group controlId='name'>
                <Form.Label>Product name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Product name'
                  name='name'
                  value={name}
                  onChange={onProductDetailsChangeHandler}></Form.Control>
              </Form.Group>
              <Form.Group controlId='price'>
                <Form.Label>Price: </Form.Label>
                <Form.Control
                  type='number'
                  name='price'
                  placeholder='$$'
                  value={price}
                  onChange={onProductDetailsChangeHandler}></Form.Control>
              </Form.Group>
              <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Provide image url'
                  name='image'
                  value={image}
                  onChange={onProductDetailsChangeHandler}></Form.Control>
              </Form.Group>
              <Form.Group controlId='imageUpload'>
                <Form.File
                  id='image-file'
                  label='Choose image file'
                  onChange={uploadImageHandler}></Form.File>
                {uploadingImage && <SpinnerLoader />}
                {image && (
                  <img
                    src={image}
                    style={{ width: '100px', marginTop: '20px' }}
                    alt={image}
                  />
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='brand'>
                <Form.Label style={{ color: 'black' }}>Brand</Form.Label>
                <Form.Control
                  type='text'
                  label='Brand'
                  value={brand}
                  name='brand'
                  onChange={onProductDetailsChangeHandler}></Form.Control>
              </Form.Group>
              <Form.Group controlId='countInStock'>
                <Form.Label style={{ color: 'black' }}>
                  Inventory amount
                </Form.Label>
                <Form.Control
                  type='number'
                  label='countInStock'
                  value={countInStock}
                  name='countInStock'
                  onChange={onProductDetailsChangeHandler}></Form.Control>
              </Form.Group>
              <Form.Group controlId='category'>
                <Form.Label style={{ color: 'black' }}>
                  Product Category
                </Form.Label>
                <Form.Control
                  type='text'
                  label='category'
                  value={category}
                  name='category'
                  onChange={onProductDetailsChangeHandler}></Form.Control>
              </Form.Group>
              <Form.Group controlId='description'>
                <Form.Label style={{ color: 'black' }}>
                  Product description
                </Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  label='description'
                  value={description}
                  name='description'
                  onChange={onProductDetailsChangeHandler}></Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Button type='submit' className='btn btn-block'>
            Update
          </Button>
        </Form>
        <ToastContainer />
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
