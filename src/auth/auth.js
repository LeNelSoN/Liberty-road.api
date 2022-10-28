const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
  
module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization
  if(!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
    return res.status(401).json({ message })
  }
  const token = authorizationHeader.split(' ')[1]
  jwt.verify(token, privateKey, (error, decodedToken) => {
  if(error) {
    const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
    return res.status(401).json({ message, data: error })
  }
  
  const hikkerId = decodedToken.hikkerId

  const ParamsId = parseInt(req.params.id)
  
  const url =  req.url.trim().split('/')
  const queryUrl = url[2]
  const queryId = url[3]

  if(ParamsId !== hikkerId && queryUrl === 'hikkers' && queryId === ''){
    const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
    return res.status(401).json({message})
  } else {
    next()
  }

  })
}