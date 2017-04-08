import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

class MainMenu extends Component {
  state = {  }
  render() {
    return (
      <div className="main-menu fill-parent">
        <div className="main-menu__content">  
          <ul className="main-menu__links">
            <li className="main-menu__link"><Link to="/new">New Game</Link></li>
            <li className="main-menu__link"><Link to="/join">Join Game</Link></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default MainMenu;