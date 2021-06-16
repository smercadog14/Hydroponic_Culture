const user = require("./user/user");
const role = require("./user/role");
const actuator = require("./station/actuator");
const compound = require("./station/compound");
const micro = require("./station/micro");
const sensor = require("./station/sensor");
const solution = require("./station/solution");
const station = require("./station/station");
const tank = require("./station/tank");
const login = require("./user/login");

const routes = [
  { path: "/api/user/", controller: user },
  { path: "/api/role/", controller: role },
  { path: "/api/actuator/", controller: actuator },
  { path: "/api/compount/", controller: compound },
  { path: "/api/micro/", controller: micro },
  { path: "/api/sensor/", controller: sensor },
  { path: "/api/solution/", controller: solution },
  { path: "/api/station/", controller: station },
  { path: "/api/tank/", controller: tank },
  { path: "/api/login/", controller: login },
];

module.exports = routes;
