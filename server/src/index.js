const Glue = require("glue");

exports.init = function(manifest, options, next) {
  Glue.compose(manifest, options, (err, server) => {
    if (err) {
      return next(err);
    }

    // Start the server
    server.start(err => {
      if (err) {
        throw err;
      }

      return next(err, server);
    });
  });
};
