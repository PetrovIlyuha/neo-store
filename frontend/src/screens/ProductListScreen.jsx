import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import SpinnerLoader from '../components/UIState/SpinnerLoader';
import { toast, ToastContainer } from 'react-toastify';
import Paginator from '../components/Paginator';
import {
  createProduct,
  deleteProduct,
  listProducts,
  productCreateReset,
} from '../redux-slices/productReducer';

const ProductListScreen = ({ history, match }) => {
  const { pageNumber } = match.params || 1;

  const dispatch = useDispatch();
  const {
    loading,
    error,
    products,
    pages,
    page,
    product,
    productDeleteSuccess,
    productDeleteLoading,
    productDeleteError,
    productCreateLoading,
    productCreateSuccess,
    productCreateError,
  } = useSelector(state => state.products);
  const { userInfo } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(productCreateReset());
    if (!userInfo.isAdmin) {
      history.push('/login');
    }
    dispatch(listProducts('', pageNumber));
  }, [dispatch, history, userInfo, pageNumber]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (productDeleteError) {
      toast.error(productDeleteError);
    }
    if (productCreateError) {
      toast.error(productCreateError);
    }
    if (productDeleteSuccess) {
      toast.success('Product was successfully deleted!');
    }
    if (productCreateSuccess) {
      toast.success('Sample product was successfully created');
      setTimeout(() => {
        history.push(`/admin/product/${product._id}/edit`);
      }, 1800);
    }
  }, [
    error,
    productDeleteError,
    productDeleteSuccess,
    productCreateSuccess,
    productCreateError,
    history,
  ]);

  if (loading || productDeleteLoading || productCreateLoading) {
    return <SpinnerLoader />;
  }

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  const deleteProductHandler = id => {
    dispatch(deleteProduct(id));
  };
  return (
    <>
      <Row className='align-items-center'>
        <Col className='bg-light m-3 skewed_dark__background'>
          <h3>Products</h3>
        </Col>
        <Col className='text-right'>
          <Button className='my-3 btn btn-info' onClick={createProductHandler}>
            <i className='fas fa-plus mr-2'></i> Create Product
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover responsive className='table-sm bg-light'>
        <thead className='text-center'>
          <tr className='table_header'>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Edit / Remove</th>
          </tr>
        </thead>
        <tbody className='table_body'>
          {products.map(product => (
            <tr key={product._id}>
              <td style={{ color: 'lightgreen' }}>{product._id}</td>
              <td style={{ color: 'lightgreen' }}>{product.name}</td>
              <td>
                <a href={`mailto:${product.email}`}>${product.price}</a>
              </td>
              <td className='text-center'>{product.category}</td>
              <td className='text-center'>{product.brand}</td>
              <td>
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                  <Button variant='warning' className='btn btn-sm btn-warning'>
                    <i className='fas fa-edit'></i>
                  </Button>
                </LinkContainer>
                <Button
                  onClick={() => deleteProductHandler(product._id)}
                  variant='danger'
                  className='btn btn-sm btn-danger ml-2'>
                  <i className='fas fa-trash'></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Paginator page={page} pages={pages} isAdmin={userInfo.isAdmin} />
      <ToastContainer />
    </>
  );
};

export default ProductListScreen;
