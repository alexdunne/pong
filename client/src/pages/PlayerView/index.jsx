import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

class PlayerView extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      joinedGamed: false,
      failedToJoinGame: false,
      socket: null
    };
  }

  componentDidMount() {
    const gameCode = this.getGameCodeFromUrl();

    if (gameCode) {
      return this.connectToGame(gameCode);
    }

    this.cancelRegisterRequestSource = axios.CancelToken.source();

    axios
      .post("http://192.168.1.70:4000/api/game/new", {
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
    const socket = io("http://192.168.1.70:4001");

    this.setState({
      socket: socket
    });

    socket.emit("join-game", { code: code });

    socket.on("join-game-success", () => {
      this.setState({
        joinedGamed: true
      });
    });

    socket.on("join-game-fail", () => {
      this.setState({
        failedToJoinGame: true
      });
    });

    this.setState({
      isLoading: false
    });
  }

  render() {
    if (this.state.isLoading) {
      return <span>Loading</span>;
    }

    if (this.state.joinedGamed) {
      return <span>Joined game!</span>;
    }

    if (this.state.failedToJoinGame) {
      return <span>Failed to join the game :(</span>;
    }

    return <span>Joining game...</span>;
  }
}

export default withRouter(PlayerView);
