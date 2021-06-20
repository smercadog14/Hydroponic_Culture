const BaseRepository = require("./Base");
const Model = require("../models/user");

class UserRepository extends BaseRepository {
  constructor() {
    super(Model);
  }

  getToken(user) {
    return user.generateJWT();
  }
}

module.exports = UserRepository;
