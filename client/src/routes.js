import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MainMenu from './pages/MainMenu';
import DeviceSelectionMenu from './pages/DeviceSelectionMenu';
import PlayerView from './pages/PlayerView';

const Routes = () => (
  <Router>
    <div className="fill-parent">
      <Route exact path="/" component={MainMenu} />
      <Route path="/device-selection" component={DeviceSelectionMenu} />
      <Route path="/player" component={PlayerView} />
    </div>
  </Router>
);

export default Routes;