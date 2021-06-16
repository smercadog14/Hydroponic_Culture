const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let jwtToken = req.header("Authorization");

  if (!jwtToken) return res.status(400).send("Authorization denied: no token");

  jwtToken = jwtToken.split(" ")[1];

  if (!jwtToken) return res.status(400).send("Authorization denied: no token");

  try {
    const payload = jwt.verify(jwtToken, process.env.SECRET_KEY_JWT);

    req.user = payload;

    next();
  } catch (error) {
    return res.status(400).send("Authorization denied: Invalid token");
  }
};

module.exports = auth;
