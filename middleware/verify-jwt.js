/* import jwt */
const jwt = require("jsonwebtoken");

module.exports = (req, token) => {
  let email = "";
  jwt.verify(token, req.app.get("api_secret_key"), (err, decoded) => {
    if (err) return false;
    email = decoded;
  });
  return email;
};
