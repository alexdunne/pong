var Hapi = require("hapi");

var server = new Hapi.Server();

server.connection({ port: 4000, labels: ["app"] });
server.connection({ port: 4001, labels: ["game-events"] });

server.register(require("./game-events"), function(err) {
  if (err) {
    throw err;
  }

  server.start();
});
