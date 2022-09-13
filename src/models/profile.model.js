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
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        is_deleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          autoIncrement: false
        }
      },
      {
        timestamps: true,
        updatedAt: false,
      }
    );
  };