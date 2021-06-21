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
    const createdUser = await super.create(
      { ...element, password: encryptedPassword },
      findCriteria
    );

    return createdUser.generateJWT();
  }

  async update(id, element) {
    let updatedUser;

    if (!element.password) {
      updatedUser = await super.update(id, {
        ...element,
      });
    } else {
      const encryptedPassword = await bcrypt.hash(element.password, 10);

      updatedUser = await super.update(id, {
        ...element,
        password: encryptedPassword,
      });
    }
    return updatedUser;
  }

  getAll(params = {}) {
    if (params.name) {
      return this.repository.list(params.name);
    }

    return super.getAll(params);
  }
}

module.exports = UserService;
