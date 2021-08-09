const {
    user,
    transactions
 } = require('../model')
const sequelize = require('../database/connection') 
module.exports =function(){
    user.hasMany(transactions)
}