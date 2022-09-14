const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const { initDB, Hikker, Path, LatLong, Profile, Friend } = require('./src/db/sequelize')
const TableRelation = require('./src/models/relationship')

app
.use(morgan("dev"))
.use(bodyParser.json());

initDB();
TableRelation();

//EndPoints:
const tableForRoutes = [
    ['hikkers', Hikker, "L'utilisateur"],
    ['paths', Path, 'Le chemin'],
    ['latlongs', LatLong , 'La Coordonnées'],
    ['profiles', Profile, 'Le Profile'],
    ['friends', Friend, "L'amitié"]
]

tableForRoutes.map(
    item => {
        //Create
        require('./src/routes/create')(app, item[0], item[1], item[2])
        //READ
        require('./src/routes/findAll')(app, item[0], item[1], item[2]);
        require('./src/routes/findByPk')(app, item[0], item[1], item[2]); 
        //Update
        require('./src/routes/update')(app, item[0], item[1], item[2]);
        //Delete
        require('./src/routes/delete')(app, item[0], item[1], item[2]);
    }
)

//ERREUR 404
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Essayer une autre URL !';
    res.status(404).json({message})
})

app.listen(port, () =>
console.log(`L'application est démarrée sur : https://localhost:${port} !`)
);

