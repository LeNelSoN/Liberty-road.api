const { Path } = require("../db/sequelize")


module.exports = {

    "GET/api/hikkers/" : (ParamsId, decodedToken) => decodedToken.isAdmin,
    "GET/api/paths/" : (ParamsId, decodedToken) => decodedToken.isAdmin,
    
    "GET/api/check/": (ParamsId, decodedToken) => true,

    "GET/api/hikkers/:params": (ParamsId, decodedToken) => decodedToken.isAdmin || ParamsId == decodedToken.hikkerId,
    "GET/api/paths/:params": (ParamsId, decodedToken) => {
        if(decodedToken.isAdmin){
            return true
        }
        return Path.findByPk(ParamsId)
        .then(({dataValues:{foreignKey}}) => {
            return foreignKey == decodedToken.hikkerId
        })
    },
    "GET/api/registration/:params": (ParamsId, decodedToken) => true,

    "PATCH/api/hikkers/:params": (ParamsId, decodedToken) => decodedToken.isAdmin || ParamsId == decodedToken.hikkerId,
    "PATCH/api/paths/:params": (ParamsId, decodedToken) => {
        if(decodedToken.isAdmin){
            return true
        }
        return Path.findByPk(ParamsId)
        .then(({dataValues:{foreignKey}}) => {
            return foreignKey == decodedToken.hikkerId
        })
    },

    "POST/api/paths/": (ParamsId, decodedToken) => true,
    "POST/api/login/": (ParamsId, decodedToken) => true,
    "POST/api/registration/": (ParamsId, decodedToken) => true,
    "POST/api/recuperation/": (ParamsId, decodedToken) => true,
    "POST/api/reset/": (ParamsId, decodedToken) => true,

    "PUT/api/hikkers/:params": (ParamsId, decodedToken) => decodedToken.isAdmin || ParamsId == decodedToken.hikkerId,
    "PUT/api/paths/:params": (ParamsId, decodedToken) => {
        if(decodedToken.isAdmin){
            return true
        }
        return Path.findByPk(ParamsId)
        .then(({dataValues:{foreignKey}}) => {
            return foreignKey == decodedToken.hikkerId
        })
        
    }

}
