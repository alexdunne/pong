var Hapi = require("hapi");

var server = new Hapi.Server();

server.connection({ host: "localhost", port: 4000, labels: ["api"] });
server.connection({ host: "localhost", port: 4001, labels: ["game-events"] });

const plugins = [require("./game-events"), require("./api/game")];

server.register(plugins, function(err) {
  if (err) {
    throw err;
  }

  // Start the server
  server.start(err => {
    if (err) {
      throw err;
    }

    const apiServer = server.select("api");
    const gameEventsServer = server.select("game-events");

    console.log("Server running at:", apiServer.info.uri);
    console.log("Server running at:", gameEventsServer.info.uri);
  });
});
