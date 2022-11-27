const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/NotFoundError');
const { emailPattern, linkPattern } = require('../consts/patterns');
const { login, createUser } = require('../controllers/users');

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().pattern(emailPattern),
      password: Joi.string().required(),
    }),
  }),
  login,
);
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().pattern(emailPattern),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(linkPattern),
    }),
  }),
  createUser,
);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('/', () => {
  throw new NotFoundError('Указанный путь не найден');
});

module.exports = router;
