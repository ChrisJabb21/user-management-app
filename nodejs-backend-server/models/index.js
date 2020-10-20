const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

 pool: {
     max: dbConfig.pool.max,
     min: dbConfig.pool.min,
     acquire: dbConfig.pool.acquire,
     idle: dbConfig.pool.idle
 }
});


//make a pool
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

//TODO set foreign key relationship in MySQL tables

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
  });
  db.user.belongsToOne(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
  });
  
db.ROLES = ["Admin", "User"];




module.exports = db;

