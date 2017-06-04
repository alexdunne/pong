const Joi = require("joi");

const internals = {};

internals.find = {
  description: "Finds the session for a given session code",
  validate: {
    params: {
      code: Joi.string()
    }
  },
  handler: (request, reply) => {
    const gameSessions = request.server.plugins["GameSessions"];
    const gameCode = encodeURIComponent(request.params.code);

    gameSessions.getByCode(gameCode).then(reply).catch(err => {
      console.log(err);
      reply(err.message);
    });
  }
};

internals.create = {
  description: "Creates a new game session",
  handler: (request, reply) => {
    const gameSessions = request.server.plugins["GameSessions"];

    gameSessions
      .createSession()
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
};

module.exports = {
  find: internals.find,
  create: internals.create
};
