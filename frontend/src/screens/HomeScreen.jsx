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
import PriceFilter from "../components/utils/PriceFilter";

import styles from "./HomeScreen.module.css";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.productList);

  const maxProductPrice =
    products && products.sort((a, b) => b.price - a.price)[0]?.price;
  const minProductPrice =
    products && products.sort((a, b) => a.price - b.price)[0]?.price;

  const [filteredPrice, setFilteredPrice] = useState(maxProductPrice || 10000);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const maxToMinFilter = () => (prev = {}, next = {}) =>
    next.price - prev.price;

  const minToMaxFilter = () => (prev = {}, next = {}) =>
    prev.price - next.price;

  const [orderFilter, setOrderFilter] = useState(maxToMinFilter);

  // effects
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

  const productCategories = products => {
    const categories = [];
    for (const item of products) {
      if (!categories.includes(item.category)) {
        categories.push(item.category);
      }
    }
    return categories;
  };

  const availableCategories = products && productCategories(products);

  const onPriceRangeChange = e => {
    setFilteredPrice(e.target.value);
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

  const handleShowCategory = e => {
    const currentCategory = e.target.value;
    if (selectedCategories.includes(currentCategory)) {
      setSelectedCategories([
        ...selectedCategories.filter(item => item !== currentCategory),
      ]);
    } else {
      setSelectedCategories([...selectedCategories, currentCategory]);
    }
  };

  const changePriceOrderFilter = () => {
    if (orderFilter.toString() === maxToMinFilter().toString()) {
      setOrderFilter(minToMaxFilter);
    } else {
      setOrderFilter(maxToMinFilter);
    }
  };

  return (
    <>
      {products.length > 0 && !loading && (
        <>
          <h1 className='text-center homePageHeader'>Hits</h1>
          <div className='filters'>
            <PriceFilter
              filteredPrice={filteredPrice}
              minProductPrice={minProductPrice}
              maxProductPrice={maxProductPrice}
              onPriceRangeChange={onPriceRangeChange}
            />
            <div className='category-filter'>
              <h4 style={{ textAlign: "center", color: "#221A66" }}>
                Categories
              </h4>
              <div>
                {availableCategories.map((category, idx) => (
                  <div key={idx} style={{ marginRight: "10px" }}>
                    <input
                      className='price_range_filter'
                      type='radio'
                      style={{
                        visibility: "hidden",
                      }}
                      id={category}
                      onClick={handleShowCategory}
                      name={category}
                      checked={selectedCategories.includes(category)}
                      value={category}
                    />
                    <label
                      className={styles.categoryFilter}
                      style={{
                        color: selectedCategories.includes(category)
                          ? "lightgreen"
                          : "pink",
                        backgroundColor: selectedCategories.includes(category)
                          ? "#221A66"
                          : "",
                        padding:
                          selectedCategories.includes(category) && "4px 4px",
                        borderRadius:
                          selectedCategories.includes(category) && "4px",
                      }}
                      htmlFor={category}>
                      {category}
                    </label>
                    <br></br>
                  </div>
                ))}
              </div>
            </div>
            <div className='orderFilter'>
              <div
                onClick={changePriceOrderFilter}
                className={styles.priceDirection}>
                {orderFilter.toString() == maxToMinFilter().toString()
                  ? "Price ⬇"
                  : "Price ⬆"}
              </div>
            </div>
          </div>
          <Row>
            {products
              .filter(item => item.price <= filteredPrice)
              .filter(item =>
                selectedCategories.length === 0
                  ? item
                  : selectedCategories.includes(item.category),
              )
              .sort(orderFilter)
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
