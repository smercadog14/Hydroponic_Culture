const Base = require("./Base");
const { role } = require("../repositories");

class RoleController extends Base {
  constructor() {
    super(role);
  }
}

module.exports = RoleController;
