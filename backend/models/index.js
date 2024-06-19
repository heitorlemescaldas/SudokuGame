const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, DataTypes);
db.Game = require('./game')(sequelize, DataTypes);
db.Result = require('./result')(sequelize, DataTypes);

module.exports = db;
