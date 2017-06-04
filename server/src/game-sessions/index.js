const SessionFactory = require("./session-factory");

const internals = {};

internals.sessions = {};

internals.getAll = () => {
  return new Promise((resolve, reject) => {
    const sessions = Object.keys(internals.sessions).map(
      id => internals.sessions[id]
    );

    resolve(sessions);
  });
};

internals.getById = sessionId => {
  gameSessions.getAll().then(sessions => {
    const session = sessions.reduce((acc, session) => {
      return session.id === sessionId ? session : acc;
    }, null);

    return session;
  });
};

internals.getByCode = code => {
  gameSessions.getAll().then(sessions => {
    const session = sessions.reduce((acc, session) => {
      return session.code === code ? session : acc;
    }, null);

    return session;
  });
};

internals.create = () => {
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

internals.createRoom = sessionId => {
  return new Promise((resolve, reject) => {});
};

exports.register = (server, options, next) => {
  server.expose("getById", internals.getById);
  server.expose("getByCode", internals.getByCode);
  server.expose("create", internals.create);

  next();
};

exports.register.attributes = {
  name: "GameSessions"
};
