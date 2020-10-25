import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Image } from 'react-bootstrap';
import SpinnerLoader from './UIState/SpinnerLoader';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { getTopRatedProducts } from '../actions/productActions';

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const {
    topProducts,
    loading: loadingTopProducts,
    error: errorTopProducts,
    success: topProductsSuccess,
  } = useSelector(state => state.topProducts);
  useEffect(() => {
    dispatch(getTopRatedProducts());
  }, [dispatch]);

  if (loadingTopProducts) return <SpinnerLoader />;
  if (errorTopProducts) {
    toast.error(
      "Products was not loaded. It's temporary. Please, try again...",
    );
  }
  return (
    <>
      <Carousel pause='hover' className='bg-dark mt-3'>
        {!loadingTopProducts &&
          topProducts &&
          topProducts.map(product => (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className='carousel-caption'>
                  <h2 className='bg-dark'>
                    {product.name} $({product.price})
                  </h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
      </Carousel>
      <ToastContainer />
    </>
  );
};

export default ProductCarousel;
