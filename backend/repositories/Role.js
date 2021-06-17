const BaseRepository = require("./Base");
const Model = require("../models/user/role");

class RoleRepository extends BaseRepository {
  constructor() {
    super(Model);
  }
}

module.exports = RoleRepository;
