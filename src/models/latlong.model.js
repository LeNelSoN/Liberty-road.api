module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "latlong",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        latitude: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        longitude: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        is_deleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          autoIncrement: false
        }
      },
    );
  };