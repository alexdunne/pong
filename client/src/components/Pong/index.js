import React, { Component } from "react";
import { Layer, Stage } from "react-konva";

import Paddle from "./paddle";

class Pong extends Component {
  render() {
    return (
      <Stage width={1000} height={1000}>
        <Layer>
          <Paddle />
        </Layer>
      </Stage>
    );
  }
}

export default Pong;
