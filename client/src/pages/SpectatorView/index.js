import React, { Component } from "react";
import axios from "axios";
import io from "socket.io-client";

class SpectatorView extends Component {
  constructor() {
    super();

    this.state = {
      gameCode: "",
      isJoiningGame: false,
      joinedGamed: false,
      failedToJoinGame: false,
      socket: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const socket = io("http://localhost:4001");

    this.setState({
      socket: socket
    });

    socket.on("spectate-game-success", () => {
      this.setState({
        joinedGamed: true,
        isJoiningGame: false
      });
    });

    socket.on("spectate-game-fail", () => {
      this.setState({
        failedToJoinGame: true,
        isJoiningGame: false
      });
    });
  }

  componentWillUnmount() {
    if (this.cancelRegisterRequestSource) {
      this.cancelRegisterRequestSource.cancel();
    }
  }

  handleChange(e) {
    this.setState({
      gameCode: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { gameCode, socket } = this.state;

    socket.emit("spectate-game", { code: gameCode });

    this.setState({
      isJoiningGame: true
    });
  }

  render() {
    const {
      gameCode,
      isJoiningGame,
      joinedGamed,
      failedToJoinGame
    } = this.state;

    if (isJoiningGame) {
      return <span>Joining...</span>;
    }

    if (joinedGamed) {
      return <span>Game on!</span>;
    }

    if (failedToJoinGame) {
      return <span>Failed to join the game :(</span>;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="join-game-game-code"
          value={gameCode}
          onChange={this.handleChange}
        />
        <input type="submit" value="Join" />
      </form>
    );
  }
}

export default SpectatorView;
