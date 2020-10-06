import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap"
import Rating from "../components/Rating"
import SpinnerLoader from "../components/UIState/SpinnerLoader"

import axios from "axios"

const ProductScreen = ({ match }) => {
  // const product = products.find(product => product._id === match.params.id)
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true)
      const { data } = await axios.get(`/api/products/${match.params.id}`)
      setProduct(data)
      setLoading(false)
    }
    fetchProduct()
  }, [match])

  if (loading) {
    return <SpinnerLoader />
  }
  return (
    <div>
      <Link
        className='btn btn-block back-home-button my-3'
        style={{ width: "140px" }}
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
              <Rating value={product.rating} text={`${product.numReviews}`} />
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
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
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
    </div>
  )
}

export default ProductScreen
