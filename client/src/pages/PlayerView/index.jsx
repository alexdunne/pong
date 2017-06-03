import React, { Component } from "react";
import axios from "axios";

class PlayerView extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true
    };
  }

  componentWillMount() {
    console.log(this.props.location.search);
    // TODO:
    // Check query param for id
    // If no id, call end point requesting one
    // Use the id to connect to the game
  }

  render() {
    if (this.state.isLoading) {
      return <span>Loading</span>;
    }

    return <span>Finished loading</span>;
  }
}

export default PlayerView;
