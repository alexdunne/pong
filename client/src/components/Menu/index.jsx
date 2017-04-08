import React from 'react';
import PropTypes from 'prop-types';

import MenuLink from '../MenuLink';

import './index.css';

const Menu = ({ links }) => {
  return (
    <ul className="menu">
      { links.map((link, index) => <MenuLink key={index} to={ link.to } text={ link.text } />) }
    </ul>
  );
};

Menu.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
};

export default Menu;