import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded product_card' bg='light' text='dark'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' className='productImage' />
      </Link>
      <Card.Body className='product_card_body'>
        <a href={`/product/${product._id}`}>
          <Card.Title as='div' className='productNameBox'>
            <strong className='productName'>{product.name}</strong>{" "}
          </Card.Title>
        </a>
        <Card.Text as='div'>
          <div className='my-3'>
            <Rating value={product.rating} text={`${product.numReviews}`} />
          </div>
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
