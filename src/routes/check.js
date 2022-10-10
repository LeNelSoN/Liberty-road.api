const { Profile } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
const auth = require('../auth/auth');
  
module.exports = (app) => {
  app.get('/api/check', (req, res) => {
    const authorizationHeader = req.headers.authorization
    const token = authorizationHeader.split(' ')[1]
    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {

    const hikkerId = decodedToken.hikkerId
    const isAdmin = decodedToken.isAdmin
      
        if(error) {
            const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
            return res.status(401).json({ message, data: error })
          }
        return res.status(200).json({ data: {hikkerId,isAdmin}})
    })
})}