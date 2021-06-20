const user = require("./user");
const role = require("./role");
// const actuator = require("./station/actuator");
// const compound = require("./station/compound");
// const micro = require("./station/micro");
// const sensor = require("./station/sensor");
// const solution = require("./station/solution");
// const station = require("./station/station");
// const tank = require("./station/tank");
// const login = require("./user/login");

const routes = [
  { path: "/users/", controller: user },
  { path: "/roles/", controller: role },
  // { path: "/actuator/", controller: actuator },
  // { path: "/compound/", controller: compound },
  // { path: "/micro/", controller: micro },
  // { path: "/sensor/", controller: sensor },
  // { path: "/solution/", controller: solution },
  // { path: "/station/", controller: station },
  // { path: "/tank/", controller: tank },
  // { path: "/login/", controller: login },
];

module.exports = routes;
