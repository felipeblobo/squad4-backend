const jwt = require("jsonwebtoken");
require("dotenv").config();

function createToken(id, email) {
  const token = jwt.sign(
    {
      id: id,
      email: email,
    },
    process.env.JWT_KEY2,
    {
      expiresIn: "1h",
    }
  );

  return token;
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_KEY);
  } catch (error) {
    return error;
  }

}

module.exports = { createToken, verifyToken }