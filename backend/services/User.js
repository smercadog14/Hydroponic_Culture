const bcrypt = require("bcrypt");
const BaseService = require("./Base");

const {
  User: UserRepository,
  Role: RoleRepository,
} = require("../repositories");

class UserService extends BaseService {
  constructor() {
    super(UserRepository);
    this.roleRepository = new RoleRepository();
  }

  async create(element) {
    const role = await this.roleRepository.findById(element.role);

    if (!role) {
      const error = new Error("There is not role to assign");
      error.statusCode = 400;
      throw error;
    }

    const encryptedPassword = await bcrypt.hash(element.password, 10);

    const findCriteria = { email: element.email };
    const toSAVE = { ...element, password: encryptedPassword };

    const createdUser = await super.create(toSAVE, findCriteria);

    return createdUser.generateJWT();
  }

  async update(id, element) {
    const encryptedPassword = await bcrypt.hash(element.password, 10);

    const toSAVE = { ...element, password: encryptedPassword };

    const updatedUser = await super.update(id, toSAVE);

    return updatedUser;
  }
}

module.exports = UserService;