const { Sequelize, DataTypes } = require("sequelize");

//Models
const { PathModel, hikkerModel, latlongModel } = require("../models/index.model");

//DATA
const { paths, hikkers, latlong } = require("./index.db");

const sequelize = new Sequelize("liberty_road", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const Path = PathModel(sequelize, DataTypes);
const Hikker = hikkerModel(sequelize, DataTypes);
const LatLong = latlongModel(sequelize, DataTypes);

const initDB = () => {

  return sequelize.sync({ force: true }).then((_) => {
    console.log('la base de donnée "Liberty Road" a bien été synchronisée.');
    paths.map(({name, description}) => {
      Path.create({
        name,
        description
      });
    });
    hikkers.map(({username, password, address}) => {
      Hikker.create({
        username,
        password,
        address
      })
    })
    latlong.map(({latitude, longitude}) => {
      LatLong.create({
        latitude,
        longitude
      })
    })
  });
};


module.exports = {
  initDB,
  Path,
  Hikker,
  LatLong
};
