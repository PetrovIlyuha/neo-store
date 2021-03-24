import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import MediaQueries from '../hooks/useMediaQuery';

const SearchBox = ({ history }) => {
  const [searchSequence, setSearchSequence] = useState('');
  const {isSmallScreen, isMediumScreen} = MediaQueries();

  const performSearch = e => {
    e.preventDefault();
    if (searchSequence.trim()) {
      setSearchSequence('');
      history.push(`/search/${searchSequence}`);
    } else {
      setSearchSequence('');
      history.push('/');
    }
  };
  console.log(searchSequence);

  return (
    <Form inline onSubmit={performSearch}>
    <Row className="searchForm">
      <Col xs={8}>
        <Form.Control
          type='text'
          name='searchTerm'
          className="appBarSearchInput"
          onChange={e => setSearchSequence(e.target.value)}
          placeholder='Search products...'
          value={searchSequence}></Form.Control>
      </Col>
      <Col xs={2}>
        <Button type='submit' variant='info' className='appBarSearchBtn'>
          Search
        </Button>
      </Col>
    </Row>
    </Form>
  );
};

export default SearchBox;
