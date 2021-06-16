const express = require("express");
const cors = require("cors");

function server() {
  this.app = express();
  this.run = (routes) => {
    this.middleware();
    this.router(routes);
    this.listen();
  };

  this.middleware = () => {
    this.app.use(express.json());
    this.app.use(cor());
  };

  this.router = (routes) => {
    routes.forEach((route) => {
      this.app.use(route.path, route.controller);
    });
  };

  this.listen = () => {
    this.app.listen(process.env.PORT, () => {
      console.log("Server Running on Port: ", process.env.PORT);
    });
  };
}

const Server = new server();
module.exports = Server;
