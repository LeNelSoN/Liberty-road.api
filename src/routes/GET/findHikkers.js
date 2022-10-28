const { Hikker, Path} = require('../../db/sequelize')
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.get(`/api/hikkers/:id/`, auth, (req, res) => {
        if (req.query.with == "paths") {
            Hikker.findByPk(req.params.id).then((hikker) => {
                if(hikker === null) {
                    const message = `L'utilisateur a été supprimé!`;
                    res.status(403).json({message})
                    return
                }
                const id = req.params.id
                Path.findAll({
                    where:{
                    hikkerId: id
                }})
                .then((paths) => {
                    const message = "L'utilisateur a bien été trouvé !";
                    res.json({message, data: {hikker, paths}})
                });
            })      
            .catch(err => {
                const message = `L'utilisateur n'a pas pu être trouvé. Réessayer plus tard !`
                res.status(500).json({message, data: err})
            });
            }else{
                Hikker.findByPk(req.params.id).then((item) => {
                if(item === null) {
                    const message = `L'utilisateur a été supprimé!`;
                    res.status(403).json({message})
                    return
                }
                const message = `L'utilisateur a bien été trouvé !`;
                res.json({message, data: item})
                })      
                .catch(err => {
                    const message = `L'utilisateur n'a pas pu être trouvé. Réessayer plus tard !`
                    res.status(500).json({message, data: err})
                });;
            }
    })
}