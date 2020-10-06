import React, { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import Product from "../components/Product"
import SpinnerLoader from "../components/UIState/SpinnerLoader"

import axios from "axios"

const HomeScreen = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      const { data } = await axios.get("/api/products")
      setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  if (loading) {
    return <SpinnerLoader />
  }
  return (
    <>
      <h1 className='text-center' style={{ color: "black" }}>
        Latest Products
      </h1>
      <Row>
        {products.length > 0 &&
          !loading &&
          products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
      </Row>
    </>
  )
}

export default HomeScreen
