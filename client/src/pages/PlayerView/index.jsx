import React, { Component } from "react";
import axios from "axios";

class PlayerView extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    const gameCode = this.getGameCodeFromUrl();

    if (gameCode) {
      return this.connectToGame(gameCode);
    }

    this.cancelRegisterRequestSource = axios.CancelToken.source();

    axios
      .post("http://localhost:4000/api/game/register", {
        cancelToken: this.cancelRegisterRequestSource.token
      })
      .then(res => res.data)
      .then(gameCode => {
        this.connectToGame(gameCode);
      })
      .catch(console.log);
  }

  componentWillUnmount() {
    this.cancelRegisterRequestSource.cancel();
  }

  getGameCodeFromUrl() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    return params.get("game");
  }

  connectToGame(gameCode) {
    // Do socket.io stuff here
  }

  render() {
    if (this.state.isLoading) {
      return <span>Loading</span>;
    }

    return <span>Finished loading</span>;
  }
}

export default PlayerView;
