const BaseController = require("./Base");
const { Role: Service } = require("../services");

class RoleController extends BaseController {
  constructor() {
    super(Service);
  }
}

module.exports = RoleController;
