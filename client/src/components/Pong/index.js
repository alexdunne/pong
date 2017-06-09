import React, { Component } from "react";
import { Layer, Stage } from "react-konva";

import Paddle from "./paddle";

class Pong extends Component {
  render() {
    const { players } = this.props;
    console.log(players);
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {players.map(player =>
            <Paddle key={player.id} x={player.x} y={player.y} />
          )}
        </Layer>
      </Stage>
    );
  }
}

export default Pong;
