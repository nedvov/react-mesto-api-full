const { allowedCors, allowedMethods } = require('../consts/allowedData');

const handleCors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  res.header('Access-Control-Allow-Credentials', true);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.set({
      'Access-Control-Allow-Methods': allowedMethods,
      'Access-Control-Allow-Headers': 'content-type',
    });
    res.status(204).send();
    return;
  }

  next();
};

module.exports = {
  handleCors,
};
