const { Path, LatLong } = require('../db/sequelize')
const auth = require('../auth/auth');

module.exports = (app) => {
    app.get(`/api/paths/:id/`, auth, (req, res) => {
        if (req.query.with == "latlongs") {
            Path.findByPk(req.params.id).then((path) => {
                if(path === null) {
                    const message = "Le chemin a été supprimé!";
                    res.status(403).json({message})
                    return
                }
                LatLong.findAll({
                    where: {
                    pathId: req.params.id,
                    },})
                .then((data = []) => {
                    const latlongs = data.map(({latitude, longitude}) => [latitude, longitude])
                    const message = "Le chemin a bien été trouvé !";
                    res.json({message, data: {path, latlongs}})
                })
                .catch(err => {
                    const message = "Le chemin n'a pas pu être trouvé. Réessayer plus tard !"
                    res.status(500).json({message, data: err})
                });
            });
            }else{
            Path.findByPk(req.params.id).then((item) => {
                if(item === null) {
                    const message = "Le chemin a été supprimé!";
                    res.status(403).json({message})
                    return
                }
                const message = "Le chemin a bien été trouvé !";
                res.json({message, data: item})
                }).catch(err => {
                    const message = "Le chemin n'a pas pu être trouvé. Réessayer plus tard !"
                    res.status(500).json({message, data: err})
                });
            }
        })
    }
