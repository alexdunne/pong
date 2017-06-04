const internals = {};

exports.register = (server, options, next) => {
  server.dependency(["GameSessions"], internals.after);
  next();
};

exports.register.attributes = {
  name: "ApiGame"
};

internals.after = function(server, next) {
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
            reply({
              id: session.id,
              code: session.code
            });
          })
          .catch(err => {
            console.log(err);
            reply(err.message);
          });
      }
    }
  });

  api.route({
    method: "GET",
    path: "/session/{code}",
    config: {
      description: "Returns the session for a given session code",
      handler: (request, reply) => {
        const gameSessions = request.server.plugins["GameSessions"];
        const gameCode = encodeURIComponent(request.params.code);

        gameSessions
          .getAllSessions()
          .then(sessions => {
            const session = sessions.reduce((acc, session) => {
              return session.code === gameCode ? session : acc;
            }, null);

            reply(session);
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
