import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ to, text }) => {
  return (    
    <li className="menu__link">
      <Link to={ to }>{ text }</Link>
    </li>
  );
};

export default Menu;