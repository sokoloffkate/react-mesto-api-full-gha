// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Unauthorised = require('../errors/Unauthorised');

const { JWT_SECRET = 'dev-key' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorised('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new Unauthorised('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
