const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { linkPattern } = require('../utils/patterns');

const {
  getUsers,
  getUserByUserId,
  updateUserByUserId,
  updateAvatarByUserId,
  getMe,
} = require('../controllers/users');

usersRouter.get('/', getUsers);

usersRouter.get('/me', getMe);
usersRouter.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum().required().hex()
        .length(24),
    }),
  }),
  getUserByUserId,
);

usersRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUserByUserId,
);

usersRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(linkPattern),
    }),
  }),
  updateAvatarByUserId,
);

module.exports = usersRouter;
