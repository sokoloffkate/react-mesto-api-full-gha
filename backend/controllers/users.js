require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const User = require('../models/user');
const NotFound = require('../errors/NotFound');
const Conflict = require('../errors/Conflict');
const { OK } = require('../utils/constants');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => next(err));
};

module.exports.geCurrenttUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFound(`Пользователь с указанным id = ${req.params.id} не найден`))
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => next(err));
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => next(err));
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new NotFound(`Пользователь с указанным id = ${req.params.id} не найден`))
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => next(err));
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => next(err));
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => next(err));
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  User.find({ email })
    .then((usr) => {
      if (usr.length > 0) {
        throw new Conflict(`Пользователь с таким email ${email} уже зарегистрирован`);
      }
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name,
          about,
          avatar,
          email,
          password: hash,
        }))
        .then((user) => {
          const userObj = user.toObject();
          delete userObj.password;
          res.send(userObj);
        });
    })
    .catch((err) => next(err));
};
