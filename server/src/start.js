const Server = require("./index");

const internals = {};

internals.manifest = {
  connections: [
    {
      host: "localhost",
      port: 4000,
      labels: ["api"]
    },
    {
      host: "localhost",
      port: 4001,
      labels: ["game-events"]
    }
  ],
  registrations: [
    {
      plugin: "./game-events",
      options: {
        select: ["game-events"]
      }
    },
    {
      plugin: "./api/game",
      options: {
        select: ["api"],
        routes: {
          prefix: "/api/game"
        }
      }
    },
    {
      plugin: "./game-sessions"
    }
  ]
};

internals.composeOptions = {
  relativeTo: __dirname
};

Server.init(internals.manifest, internals.composeOptions, (err, server) => {
  const apiServer = server.select("api");
  const eventsServer = server.select("game-events");

  console.log("Server running at:", apiServer.info.uri);
  console.log("Server running at:", eventsServer.info.uri);
});
