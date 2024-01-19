const jwt = require("jsonwebtoken");

const authentification = (req, res, next) => {
  req.session.token = null
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ ok: false, error: "Invalid token" });
    }
    req.user = decoded;
    console.log(req.user);
    next();
  });
};

module.exports = { authentification };
