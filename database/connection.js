const Sequelize = require('sequelize')
require('dotenv').config()
const ENV = process.env

const sequelize = new Sequelize(
    ENV.DB_NAME,
    ENV.USER,
    ENV.PASSWORD,
    {
        dialect:'mysql',
        host:'localhost'
    }
)

module.exports = sequelize