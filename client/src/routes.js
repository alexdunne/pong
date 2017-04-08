import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MainMenu from './pages/MainMenu';

const Routes = () => (
  <Router>
    <Route exact path="/" component={MainMenu} />
  </Router>
);

export default Routes;