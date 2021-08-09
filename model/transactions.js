const Sequelize = require('sequelize')
const sequelize = require('../database/connection')

module.exports=sequelize.define('transactions',{
    id:{
      type:Sequelize.INTEGER(10),
      autoIncrement: true,
      primaryKey:true
    },

    transaction_id:{
        type:Sequelize.INTEGER(15),
        allowNull:false,
    },
    status:{
        type:Sequelize.STRING(30),
        allowNull:false
    },
    amount:{
        type:Sequelize.INTEGER(10),
        allowNull:false
    }
})