const jwt = require('jsonwebtoken');
const config = require('./config');

function auth(req, res, next){
  const bearerToken = req.header('Authorization');

  if(!bearerToken){
    return res.status(401).json({message: 'Acceso denegado'});
  }

  const token = bearerToken.split(' ')[1];

  try{
    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded;
    next()
  }
  catch(error){
    res.status(401).json({message: 'Token invalido'});
  }
}

module.exports = auth;