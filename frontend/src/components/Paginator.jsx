import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginator = ({ pages, page, isAdmin = false, searchParam = '' }) => {
  return (
    pages > 1 && (
      <Pagination style={{ margin: '0px auto 100px auto', zIndex: -10 }}>
        {[...Array(pages).keys()].map(item => (
          <LinkContainer
            key={item + 1}
            to={
              !isAdmin
                ? searchParam
                  ? `/search/${searchParam}/page/${item + 1}`
                  : `/page/${item + 1}`
                : `/admin/productlist/${item + 1}`
            }>
            <Pagination.Item active={item + 1 === page}>
              {item + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginator;
