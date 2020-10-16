// 3-rd parties
import React, { useEffect, useState } from "react";
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

  const maxProductPrice =
    products && products.sort((a, b) => b.price - a.price)[0]?.price;
  const minProductPrice =
    products && products.sort((a, b) => a.price - b.price)[0]?.price;

  const [filteredPrice, setFilteredPrice] = useState(maxProductPrice || 10000);
  const [showPriceIndication, setShowPriceIndication] = useState(false);

  useEffect(() => {
    if (maxProductPrice) {
      setFilteredPrice(maxProductPrice);
    }
  }, [maxProductPrice]);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  if (loading) {
    return <SpinnerLoader />;
  }

  const onPriceRangeChange = e => {
    setFilteredPrice(e.target.value);
    setShowPriceIndication(true);
  };

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
          <label htmlFor='price-filter'>Filter by price</label>
          <input
            type='range'
            id='price-filter'
            value={filteredPrice}
            min={minProductPrice}
            max={maxProductPrice}
            onChange={onPriceRangeChange}
            onBlur={() => setShowPriceIndication(false)}
          />{" "}
          {showPriceIndication && (
            <h4 style={{ color: "#3f3f3f" }}> &lt; ${filteredPrice}</h4>
          )}
          <Row>
            {products
              .filter(item => item.price < filteredPrice)
              .map(product => (
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
