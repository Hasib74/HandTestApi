const dbConfig = require('./Database/config');
const Sequelize = require('sequelize');
const { DB } = require('./Database/config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operatorsAliases: 0,

	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admin = require('./Model/userModel')(sequelize, Sequelize);

module.exports = db;
