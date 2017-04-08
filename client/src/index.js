import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

import Routes from './routes';

import './index.css';
import './stars-background.css';

const App = (props) => {
  return (
    <div>
      <div className="stars"></div>
      <div className="twinkling"></div>
      <Routes history={props.browserHistory} />
    </div>
  );
};

ReactDOM.render(
  <App history={browserHistory} />,
  document.getElementById('root')
);
