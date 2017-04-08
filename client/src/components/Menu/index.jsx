import React from 'react';

import MenuLink from '../MenuLink';

import './index.css';

const Menu = ({ links }) => {
  return (
    <ul className="menu">
      { links.map((link, index) => <MenuLink key={index} to={ link.to } text={ link.text } />) }
    </ul>
  );
};

export default Menu;