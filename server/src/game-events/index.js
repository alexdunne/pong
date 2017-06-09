const internals = {};

exports.register = (server, options, next) => {
  server.dependency(["GameSessions"], internals.after);
  next();
};

internals.after = (server, next) => {
  const gameSessions = server.plugins["GameSessions"];
  const io = require("socket.io")(server.select("game-events").listener);

  io.on("connection", socket => {
    console.log("Received a new connection");

    socket.on("join-game", function({ code }) {
      internals.joinGame(gameSessions, socket, code);
    });

    socket.on("spectate-game", function({ code }) {
      internals.spectate(gameSessions, socket, code);
    });
  });

  next();
};

internals.joinGame = (gameSessions, socket, code) => {
  console.log(`Received request to join game ${code} from socket ${socket.id}`);

  gameSessions
    .getByCode(code)
    .then(session => gameSessions.addPlayerToSession(session.id, socket.id))
    .then(session => {
      if (session && session.code) {
        socket.join(session.code);
        socket.emit("join-game-success");
      } else {
        socket.emit("join-game-fail");
      }
    })
    .catch(() => {
      socket.emit("join-game-fail");
    });
};

internals.spectate = (gameSessions, socket, code) => {
  console.log(
    `Received request to spectate game ${code} from socket ${socket.id}`
  );

  gameSessions
    .getByCode(code)
    .then(session => {
      if (session && session.code) {
        socket.join(session.code);
        socket.emit("spectate-game-success", { players: session.players });
      } else {
        socket.emit("spectate-game-fail");
      }
    })
    .catch(() => {
      socket.emit("spectate-game-fail");
    });
};

exports.register.attributes = {
  name: "GameEvents"
};
