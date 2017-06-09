const Server = require("./index");

const internals = {};

internals.manifest = {
  connections: [
    {
      host: "192.168.1.70",
      port: 4000,
      labels: ["api"],
      routes: {
        cors: true
      }
    },
    {
      host: "192.168.1.70",
      port: 4001,
      labels: ["game-events"],
      routes: {
        cors: true
      }
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
  if (err) {
    console.log(err);
  }

  const apiServer = server.select("api");
  const eventsServer = server.select("game-events");

  console.log("Server running at:", apiServer.info.uri);
  console.log("Server running at:", eventsServer.info.uri);
});
