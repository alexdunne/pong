import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

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
      .post("http://localhost:4000/api/game/new", {
        cancelToken: this.cancelRegisterRequestSource.token
      })
      .then(res => res.data)
      .then(({ id, code }) => {
        this.props.history.push(`/player?game=${code}`);
        this.connectToGame(code);
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

  connectToGame(code) {
    const socket = io("http://localhost:4001");
    socket.emit("join-game", { code: code });

    socket.on("joined-game", function(data) {
      console.log(data);
    });

    this.setState({
      isLoading: false
    });
  }

  render() {
    if (this.state.isLoading) {
      return <span>Loading</span>;
    }

    return <span>Finished loading</span>;
  }
}

export default withRouter(PlayerView);
