const {Profile} = require('../../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../../auth/private_key')

module.exports = (app) => {
    app.get('/api/registration/:token', (req, res) => {

        const token = req.params.token
        let login
        let pseudo
        let password
        let address

        jwt.verify(token, privateKey, (error, decodedToken) => {
            login = decodedToken.login
            pseudo = decodedToken.pseudo
            password = decodedToken.password
            address = decodedToken.address
            if(error) {
                const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
                return res.status(401).json({ message, data: error })
            }
        })

        Profile.findOne({ where: { login: login } }).then(user => {
            if(user){
                const message = "L'utilisateur demandé existe déjà"
                return res.status(409).json({message, data:login})
            }
            bcrypt.hash(password, 10)
                .then(hash => {
                    return Profile.create({login, password: hash})
                })
                .then(profil=> {
                    const {dataValues:{id}} = profil
                    return profil.createHikker({username: pseudo, address})
                })
                .then(hikker => {
                    const {dataValues:{id}, appUserId} = hikker
                    return Profile.update({hikkerId:id}, {
                        where: { id: appUserId },
                        }).then(_ => res.redirect(`http://localhost:3000/profil?login=${login}`)
                    )
                })})
        .catch(err => {
            const message = "L'utilisateur n'a pas pu être créé. Réessayez plus tard !"
            return res.json({message, data: err})
        })
    })

}