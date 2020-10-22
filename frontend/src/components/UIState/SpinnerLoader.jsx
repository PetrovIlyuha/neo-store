import React from 'react';
import { css } from '@emotion/core';
import RiseLoader from 'react-spinners/RiseLoader';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%, -50%);
  border-color: red;
`;

function Loader({ size }) {
  return (
    <div className='sweet-loading'>
      <RiseLoader
        css={override}
        size={size || 50}
        color={'#54E7A0'}
        loading={true}
      />
    </div>
  );
}

export default Loader;
