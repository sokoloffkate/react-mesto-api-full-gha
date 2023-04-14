const allowedCors = [
  'https://mesto.sokolova.nomoredomains.monster',
  'http://mesto.sokolova.nomoredomains.monster',
  'localhost:3000',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  console.log(req.header.origin);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
