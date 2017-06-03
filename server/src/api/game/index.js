const internals = {};

exports.register = (server, options, next) => {
  const api = server.select("api");

  api.route({
    method: "POST",
    path: "/register",
    config: {
      description: "Generates a new game session",
      handler: (request, reply) => {
        const gameSessions = request.server.plugins["GameSessions"];

        gameSessions
          .createGameSession()
          .then(session => {
            reply(session.code);
          })
          .catch(err => {
            console.log(err);
            reply(err.message);
          });
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: "ApiGame"
};
