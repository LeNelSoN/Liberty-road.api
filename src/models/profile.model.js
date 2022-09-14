module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "appUser",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        login: {
          type: DataTypes.STRING,
          unique: {
            msg: 'ce login est déjà utilisé'
          }
        },
        password: {
          type: DataTypes.STRING,
        },
        is_deleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          autoIncrement: false
        }
      }
    );
  };