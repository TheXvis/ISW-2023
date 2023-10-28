function auth(req, res, next){
    const token = req.header('Authorization');
  
    if(!token){
      return res.status(401).json({message: 'Acceso denegado'});
    }
    try{
      const decoded = jwt.verify(token, 'secreto');
      req.user = decoded;
      next()
    }
    catch(error){
      res.status(401).json({message: 'Token invalido'});
    }
  }

  module.exports = auth;