import React from 'react';

import Menu from '../../components/Menu';

const DeviceSelectionMenu = () => {
  const links = [
    { to: '/player', text: 'I\'m Playing'},
    { to: '/spectator', text: 'I\'m Watching'},
  ];

  return (
    <div className="v-wrap fill-parent">
      <div className="v-content text-center">
        <Menu links={links} />
      </div>
    </div>
  );
};

export default DeviceSelectionMenu;