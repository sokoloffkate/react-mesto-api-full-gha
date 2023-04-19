const UserRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUser, geCurrenttUser, updateUser, updateAvatar,
} = require('../controllers/users');
const { REGEXP_URL } = require('../utils/constants');

UserRouter.get('/', getUsers);
UserRouter.get('/me', geCurrenttUser);

UserRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}), getUser);

UserRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

UserRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
  avatar: Joi.string().required().pattern(REGEXP_URL),
  }),
}), updateAvatar);

module.exports = UserRouter;
