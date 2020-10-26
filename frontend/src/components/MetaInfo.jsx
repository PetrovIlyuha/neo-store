import React from 'react';
import { Helmet } from 'react-helmet';

const MetaInfo = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

MetaInfo.defaultProps = {
  title: 'Welcome to NeoStore',
  description: 'Best price proposals for electronic devices',
  keywords:
    'Technological products, electronics, phones, laptops, iphone, samsung',
};

export default MetaInfo;
