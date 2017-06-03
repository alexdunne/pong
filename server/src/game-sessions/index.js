const SessionFactory = require("./session-factory");

const internals = {};

internals.sessions = {};

internals.getAllSessions = () => {
  return new Promise((resolve, reject) => {
    const sessions = Object.keys(internals.sessions).map(
      id => internals.sessions[id]
    );

    resolve(sessions);
  });
};

internals.createGameSession = () => {
  return new Promise((resolve, reject) => {
    try {
      const session = SessionFactory.create();

      internals.sessions = Object.assign({}, internals.sessions, {
        [session.id]: session
      });

      resolve(session);
    } catch (err) {
      reject(err);
    }
  });
};

exports.register = (server, options, next) => {
  server.expose("getAllSessions", internals.getAllSessions);
  server.expose("createGameSession", internals.createGameSession);

  next();
};

exports.register.attributes = {
  name: "GameSessions"
};
