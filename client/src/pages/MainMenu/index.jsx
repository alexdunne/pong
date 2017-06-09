import React from "react";

import Menu from "../../components/Menu";

const MainMenu = () => {
  const links = [
    { to: "/device-selection", text: "New Game" },
    { to: "/spectator", text: "Join Game" }
  ];

  return (
    <div className="v-wrap fill-parent">
      <div className="v-content text-center">
        <Menu links={links} />
      </div>
    </div>
  );
};

export default MainMenu;
