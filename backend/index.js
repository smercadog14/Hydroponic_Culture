const server = require("./server");
const routes = require("./routes/routes");
const dotenv = require("dotenv");
const { dbConnection } = require("./db/db");
const validEnv = require("./utils/env");

dotenv.config();
validEnv();

function index() {
  server.run(routes);
  dbConnection();
}

index();
