const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers.token;
  if (token) {
    try {
      const result = jwt.verify(token, process.env.SECRET_KEY);
      req.user = result;
      next();
    } catch (error) {
      res.status(401).json({ message: "invalid token" });
      console.log(error);
    }
  } else {
    res.status(401).json({ message: "no token provided" });
  }
}

function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, next, () => {
    console.log("dd" + req.params.id);

    if (req.user.id === req.params.id || req.user.isAdmin === true) {
      next();
      console.log(req.user.id);
    } else {
      return res
        .status(403)
        .json({ message: "you're not allowed, only admin1" });
    }
  });
}

function verifyTokenAndAdmin(req, res, next) {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "you're not allowed, only admin2" });
  }
}

module.exports = { verifyTokenAndAuthorization, verifyTokenAndAdmin };
