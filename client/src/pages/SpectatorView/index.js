import React, { Component } from "react";
import io from "socket.io-client";

import Pong from "../../components/Pong";

class SpectatorView extends Component {
  constructor() {
    super();

    this.state = {
      gameCode: "",
      isJoiningGame: false,
      joinedGamed: false,
      failedToJoinGame: false,
      socket: null,
      players: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const socket = io("http://192.168.1.70:4001");

    this.setState({
      socket: socket
    });

    socket.on("spectate-game-success", data => {
      this.setState({
        joinedGamed: true,
        isJoiningGame: false,
        players: data.players.map((player, index) => ({
          id: player.id,
          x: index === 0 ? 10 : window.innerWidth - 10 - 50,
          y: (window.innerHeight - 150) / 2,
          height: 150,
          width: 50
        }))
      });
    });

    socket.on("spectate-game-fail", () => {
      this.setState({
        failedToJoinGame: true,
        isJoiningGame: false
      });
    });
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
      failedToJoinGame,
      players
    } = this.state;

    if (isJoiningGame) {
      return <span>Joining...</span>;
    }

    if (joinedGamed) {
      return <Pong players={players} />;
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
