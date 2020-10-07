// 3-rd parties
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Col, Row } from "react-bootstrap";

import Product from "../components/Product";
import SpinnerLoader from "../components/UIState/SpinnerLoader";
import ServerError from "../assets/images/ServerError";

// redux ops
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.productList);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  if (loading) {
    return <SpinnerLoader />;
  }

  if (error) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}>
        <h2 style={{ color: "darkgray", marginLeft: -10, textAlign: "center" }}>
          <span style={{ color: "red" }}>{error}</span>
          <br />
          We already working on it...
        </h2>
        <ServerError />
      </div>
    );
  }

  return (
    <>
      {products.length > 0 && !loading && (
        <>
          <h1 className='text-center homePageHeader'>Hits</h1>
          <Row>
            {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default HomeScreen;
