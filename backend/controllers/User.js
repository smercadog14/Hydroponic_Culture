const Base = require("./Base");
const { user } = require("../repositories");

class UserController extends Base {
  constructor() {
    super(user);
  }

  async create(req, res) {
    const user = await this.repository.findOneEmail({ email: req.body.email });

    if (user)
      return res
        .status(400)
        .send("Process failed: The user is already registered");

    const hash = await bcrypt.hash(req.body.password, 10);

    const role = await repository.findOne({ name: "user" });
    if (!role)
      return res.status(400).send("Process failed: No role was assigned");

    req.body.password = hash;

    try {
      await repository.create(req.body);

      const result = await user.save();
      if (!result) return res.status(401).send("Failed to register user");

      const jwtToken = user.generateJWT();
      res.status(200).send({ jwtToken });
    } catch (e) {
      return res.status(400).send("Failed to register user");
    }
  }
}

module.exports = UserController;
