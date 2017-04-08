import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MenuLink = ({ to, text }) => {
  return (    
    <li className="menu__link">
      <Link to={ to }>{ text }</Link>
    </li>
  );
};

MenuLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default MenuLink;