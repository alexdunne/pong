const Handlers = require("./handlers");

const internals = {};

exports.register = (server, options, next) => {
  server.dependency(["GameSessions"], internals.after);
  next();
};

internals.after = (server, next) => {
  const io = require("socket.io")(server.select("game-events").listener);

  io.on("connection", socket => {
    console.log("Received a new connection");

    socket.on("move", Handlers.move);
  });

  next();
};

exports.register.attributes = {
  name: "GameEvents"
};
