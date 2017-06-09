import React, { Component } from "react";
import { Rect } from "react-konva";

class Paddle extends Component {
  render() {
    const { x, y, color, height, width } = this.props;
    return <Rect x={x} y={y} width={width} height={height} fill={color} />;
  }
}

Paddle.defaultProps = {
  x: 10,
  y: 10,
  height: 150,
  width: 50,
  color: "white"
};

export default Paddle;
