const BaseRepository = require("./Base");

class UserRepository extends BaseRepository {
  findOneEmail(email) {
    return this.Model.findOne({ email });
  }

  getJwtToken(user) {
    return user.generateJWT();
  }
}

module.exports = UserRepository;
