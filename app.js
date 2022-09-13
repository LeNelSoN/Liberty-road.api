const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const { initDB } = require('./src/db/sequelize')
const TableRelation = require('./src/models/relationship')

app
.use(morgan("dev"))
.use(bodyParser.json());

initDB();
TableRelation();

//EndPoints:

//Create
require('./src/routes/Post/createPaths')(app);

require('./src/routes/Post/createHikkers')(app);

//READ
require('./src/routes/Get/findAllPaths')(app);

require('./src/routes/Get/findAllHikkers')(app);

require('./src/routes/Get/findByPkPaths')(app); 

require('./src/routes/Get/findByPkHikkers')(app); 

require('./src/routes/Get/getHikkersWithPaths')(app); 

require('./src/routes/Get/getPathWithLatLongs')(app); 


//Update
require('./src/routes/Put/updateHikkers')(app);

require('./src/routes/Put/updatePaths')(app);


//Delete Hard
require('./src/routes/Delete/deletePath')(app);

require('./src/routes/Delete/deleteHikker')(app);


app.listen(port, () =>
console.log(`L'application est démarrée sur : https://localhost:${port} !`)
);

