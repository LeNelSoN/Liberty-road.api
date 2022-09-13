module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "friend",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        is_deleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          autoIncrement: false
        }
      },
      {
        updatedAt: false,
      }

    );
  };