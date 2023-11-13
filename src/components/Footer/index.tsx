import { DefaultFooter } from '@ant-design/pro-components';

import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = 'ZeroCMF';

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
    />
  );
};

export default Footer;
