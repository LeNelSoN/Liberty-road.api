const jwt = require('jsonwebtoken');
const privateKey = require('../auth/private_key');
require('./restrictedRoute');
  
module.exports = (req, res, next) => {

  const authorizationHeader = req.headers.authorization;

  if(!authorizationHeader) {
    
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
    return res.status(401).json({ message });
    
  }
  
  const token = authorizationHeader.split(' ')[1];

  jwt.verify(token, privateKey, (error, decodedToken) => {
    
    if(error) {
      
      const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`;
      return res.status(401).json({ message, data: error });
      
    }  
    
    if(decodedToken.exp > Date.now()) {

      const message = `Le Token à expiré`;
      return res.status(401).json({ message});

    }

  const ParamsId = parseInt(req.params.id);

  const url = req.url.trim().split("/");
  const methodUrl = `${req.method}/${url[1]}/${url[2]}/${url[3] ? ':params': ''}`;

  const restrictedRoute = require('./restrictedRoute')[methodUrl];
  
  if(!restrictedRoute(ParamsId, decodedToken)){

    const message = `Route non autorisé`;
    return res.status(401).json({ message});

  } else {

    next();

  };

  })

}