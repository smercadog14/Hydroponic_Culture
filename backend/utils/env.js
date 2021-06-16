const env = require("envalid");
const { port, str } = require("envalid");

function validEnv() {
  env.cleanEnv(process.env, {
    PORT: port(),
    MONGODB: str(),
  });
}

module.exports = validEnv;
