const { allowedCors, allowedMethods } = require('../consts/allowedData');

const handleCors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', allowedMethods);
    res.status(204).send();
  }

  next();
};

module.exports = {
  handleCors,
};
