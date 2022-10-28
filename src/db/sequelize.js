const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt')

//Models
const { PathModel, hikkerModel, latlongModel, profileModel } = require("../models/index.model");
const Data = require("./index.db");

//DATA
const { paths, hikkers, latlong } = require("./index.db");

let sequelize;
if (process.env.NODE_ENV === 'development') {
  sequelize = new Sequelize("liberty_road", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  });
}else{
  //...
}

const Path = PathModel(sequelize, DataTypes);
const Hikker = hikkerModel(sequelize, DataTypes);
const LatLong = latlongModel(sequelize, DataTypes);
const Profile = profileModel(sequelize, DataTypes);

const initDB = () => {

  return sequelize.sync(
    { force: true }
    )
    .then((_) => {
    console.log('la base de donnée "Liberty Road" a bien été synchronisée.');
    paths.map(({name, description}) => {
      Path.create({
        name,
        description,
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

    bcrypt.hash('LePassword', 10)
    .then(hash => Profile.create({login:'nelis.valentin@gmail.com', password: hash, isAdmin: 1}))
  });
};


module.exports = {
  initDB,
  Path,
  Hikker,
  LatLong,
  Profile
};
