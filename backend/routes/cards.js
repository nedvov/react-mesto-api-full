const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { linkPattern } = require('../utils/patterns');

const {
  getCards,
  removeCardByCardId,
  createCard,
  likeCardByCardId,
  removeLikeFromCardByCardId,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().required().hex()
      .length(24),
  }),
}), removeCardByCardId);
cardsRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(linkPattern),
    }),
  }),
  createCard,
);
cardsRouter.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().required().hex()
        .length(24),
    }),
  }),
  likeCardByCardId,
);
cardsRouter.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().required().hex()
        .length(24),
    }),
  }),
  removeLikeFromCardByCardId,
);

module.exports = cardsRouter;
