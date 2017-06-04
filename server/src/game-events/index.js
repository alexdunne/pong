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
      console.log(
        `Received request to join game ${code} from socket ${socket.id}`
      );

      gameSessions
        .getByCode(code)
        .then(session => {
          if (session.players.length < 2) {
            return gameSessions.addPlayerToSession(session.id, socket.id);
          }
        })
        .then(session => {
          if (session && session.code) {
            socket.join(session.code);
            socket.emit("joined-game");
          }
        })
        .catch(console.log);
    });
  });

  next();
};

exports.register.attributes = {
  name: "GameEvents"
};
