const CardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { REGEXP_URL } = require('../utils/constants');

CardRouter.get('/', getCards);

CardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(REGEXP_URL),
  }),
}), createCard);

CardRouter.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}), deleteCard);

CardRouter.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}), likeCard);

CardRouter.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}), dislikeCard);

module.exports = CardRouter;
