const SessionFactory = require("./session-factory");
const UserFactory = require("./user-factory");

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

internals.getById = sessionId => {
  return internals.getAllSessions().then(sessions => {
    const session = sessions.reduce((acc, session) => {
      return session.id === sessionId ? session : acc;
    }, null);

    return session;
  });
};

internals.getByCode = code => {
  return internals.getAllSessions().then(sessions => {
    const session = sessions.reduce((acc, session) => {
      return session.code === code ? session : acc;
    }, null);

    return session;
  });
};

internals.createSession = () => {
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

internals.updateSession = (id, session) => {
  return new Promise((resolve, reject) => {
    try {
      internals.sessions = Object.assign({}, internals.sessions, {
        [id]: session
      });

      resolve(session);
    } catch (err) {
      reject(err);
    }
  });
};

internals.addPlayerToSession = (sessionId, userId) => {
  const user = UserFactory.create({ id: userId });

  return internals
    .getById(sessionId)
    .then(session => {
      session.players = session.players.concat(user);
      return session;
    })
    .then(session => internals.updateSession(session.id, session));
};

exports.register = (server, options, next) => {
  server.expose("getAllSessions", internals.getAllSessions);
  server.expose("getById", internals.getById);
  server.expose("getByCode", internals.getByCode);
  server.expose("createSession", internals.createSession);
  server.expose("addPlayerToSession", internals.addPlayerToSession);

  next();
};

exports.register.attributes = {
  name: "GameSessions"
};
