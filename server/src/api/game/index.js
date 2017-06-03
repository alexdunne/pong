const internals = {};

exports.register = (server, options, next) => {
  const api = server.select("api");

  api.route({
    method: "POST",
    path: "/register",
    config: {
      description: "Generates a new game session",
      handler: (request, reply) => {
        return reply("OK");
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: "game"
};
