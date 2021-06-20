const BaseController = require("./Base");
const { User: Service } = require("../services");

class UserController extends BaseController {
  constructor() {
    super(Service);
  }

  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).send("Incorrect email or password");

      const hash = await bcrypt.compare(req.body.password, user.password);
      if (!user.active || !hash)
        return res.status(400).send("Incorrect email or password");

      const jwtToken = user.generateJWT();
      return res.status(200).send({ jwtToken });
    } catch (e) {
      return res.status(400).send("Login error");
    }
  }
}

module.exports = UserController;