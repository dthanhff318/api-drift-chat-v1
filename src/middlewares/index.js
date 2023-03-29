const { HTTPStatusCode } = require("../constants");
const { decodeToken } = require("../utilities/tokenHelper");

const verifyToken = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    decodeToken(accessToken);
    next();
  } catch (err) {
    return res.status(HTTPStatusCode.UNAUTHORIZED).json("Unauthorized");
  }
};

module.exports = {
  verifyToken,
};
