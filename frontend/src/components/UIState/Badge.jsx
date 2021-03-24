import React from 'react';

const Badge = ({ textContent }) => {
  return <h3 className={badge}>{textContent}</h3>;
};

export default Badge;

const badge = {
  position: 'absolute',
  top: 0,
  left: 0,
  transform: 'rotate(-45deg)',
};
