const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const ValidationError = require('../errors/ValidationError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') { next(new ValidationError(err.message)); } else next(err);
    });
};

module.exports.removeCardByCardId = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card.findById(cardId)
    .orFail(new NotFoundError('Ошибка. Запрашиваемая карточка не найдена'))
    .then((card) => {
      if (card.owner.toString() === userId) {
        Card.findByIdAndRemove(cardId).then((dcard) => res.send(dcard));
      } else throw new ForbiddenError('Нельзя удалять чужие карточки');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new ValidationError('Передан некорректный идентификатор карточки'),
        );
      } else next(err);
    });
};

module.exports.likeCardByCardId = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .orFail(new NotFoundError('Ошибка. Запрашиваемая карточка не найдена'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') { next(new ValidationError(err.message)); } else if (err.name === 'CastError') {
        next(
          new ValidationError('Передан некорректный идентификатор карточки'),
        );
      } else next(err);
    });
};

module.exports.removeLikeFromCardByCardId = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .orFail(new NotFoundError('Ошибка. Запрашиваемая карточка не найдена'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') { next(new ValidationError(err.message)); } else if (err.name === 'CastError') {
        next(
          new ValidationError('Передан некорректный идентификатор карточки'),
        );
      } else next(err);
    });
};
