module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    boardId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    initialState: {
      type: DataTypes.JSON,
      allowNull: false
    },
    currentState: {
      type: DataTypes.JSON,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return Game;
};
