module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('Result', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    boardId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timeTaken: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Result;
};
