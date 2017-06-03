const uuidV4 = require("uuid/v4");
const randomWords = require("random-words");

module.exports.create = () => ({
  id: uuidV4(),
  code: randomWords({ exactly: 2, join: "-" }),
  createdAt: new Date(),
  players: [],
  score: {}
});
