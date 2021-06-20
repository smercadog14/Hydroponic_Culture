const BaseService = require("./Base");

const { Role: Repository } = require("../repositories");

class RoleService extends BaseService {
  constructor() {
    super(Repository);
  }
}

module.exports = RoleService;
