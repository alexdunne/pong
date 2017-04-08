import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MainMenu from './pages/MainMenu';
import DeviceSelectionMenu from './pages/DeviceSelectionMenu';

const Routes = () => (
  <Router>
    <div className="fill-parent">
      <Route exact path="/" component={MainMenu} />
      <Route path="/device-selection" component={DeviceSelectionMenu} />
    </div>
  </Router>
);

export default Routes;