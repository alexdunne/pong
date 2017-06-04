const Controller = require("./controller");

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
    method: "GET",
    path: "/{code}",
    config: Controller.find
  });

  api.route({
    method: "POST",
    path: "/new",
    config: Controller.create
  });

  next();
};
