/** @format */

import React from 'react';
import { SITE_NAME } from '../utils/helper';

const Footer = () => {
  return (
    <footer className='footer-wrap'>
      <span className='footer-copyright'>
        © 2023{' '}
        <a href='https://jksol.com/' target='_blank' className='site-name'>
          {SITE_NAME}
        </a>
      </span>
    </footer>
  );
};

export default Footer;
