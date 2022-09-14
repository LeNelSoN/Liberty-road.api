const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const { initDB, Hikker, Path, LatLong, Profile } = require('./src/db/sequelize')
const TableRelation = require('./src/models/relationship')

app
.use(morgan("dev"))
.use(bodyParser.json());

initDB();
TableRelation();

//EndPoints:

//Create
require('./src/routes/Post/create')(app, 'hikkers', Hikker, "L'utilisateur");
require('./src/routes/Post/create')(app, 'paths', Path, 'Le chemin');
require('./src/routes/Post/create')(app, 'latlongs', LatLong, 'La Coordonnées');
require('./src/routes/Post/create')(app, 'profiles', Profile, 'Le Profile');

//READ
require('./src/routes/Get/findAll')(app, 'hikkers', Hikker, "L'utilisateur");
require('./src/routes/Get/findAll')(app, 'paths', Path, 'Le chemin');
require('./src/routes/Get/findAll')(app, 'latlongs', LatLong, 'La Coordonnée');
require('./src/routes/Get/findAll')(app, 'profiles', Profile, 'Le Profile');

require('./src/routes/Get/findByPk')(app, 'hikkers', Hikker, "L'utilisateur"); 
require('./src/routes/Get/findByPk')(app, 'paths', Path, 'Le chemin'); 
require('./src/routes/Get/findByPk')(app, 'latlongs', LatLong, 'La Coordonnée'); 
require('./src/routes/Get/findByPk')(app, 'profiles', Profile, 'Le Profile'); 

require('./src/routes/Get/getHikkersWithPaths')(app); 
require('./src/routes/Get/getPathWithLatLongs')(app); 

//Update
require('./src/routes/Put/update')(app, 'hikkers', Hikker, "L'utilisateur");
require('./src/routes/Put/update')(app, 'paths', Path, 'Le chemin');
require('./src/routes/Put/update')(app, 'latlongs', LatLong, 'La Coordonnée');
require('./src/routes/Put/update')(app, 'profiles', Profile, 'Le Profile');

//Delete
require('./src/routes/Delete/delete')(app, 'hikkers', Hikker, "L'utilisateur");
require('./src/routes/Delete/delete')(app, 'paths', Path, 'Le chemin');
require('./src/routes/Delete/delete')(app, 'latlongs', LatLong, 'La Coordonnée');
require('./src/routes/Delete/delete')(app, 'profiles', Profile, 'Le Profile');

//ERREUR 404
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Essayer une autre URL !';
    res.status(404).json({message})
})

app.listen(port, () =>
console.log(`L'application est démarrée sur : https://localhost:${port} !`)
);

