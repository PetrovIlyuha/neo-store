import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [searchSequence, setSearchSequence] = useState('');

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
      <Form.Control
        type='text'
        name='searchTerm'
        onChange={e => setSearchSequence(e.target.value)}
        className='mr-sm-2 ml-sm-5'
        placeholder='Search products...'
        value={searchSequence}></Form.Control>
      <Button type='submit' variant='outline-info' className='p-2'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
