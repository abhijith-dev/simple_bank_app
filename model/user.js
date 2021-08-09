const Sequelize = require('sequelize')
const sequelize = require('../database/connection')

module.exports=sequelize.define('user',{
    id:{
        type:Sequelize.STRING(11),
        allowNull:false,
        uninque:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING(30),
        allowNull:false,
    },
    password:{
        type:Sequelize.STRING(100),
        allowNull:false
    },
    amount:{
        type:Sequelize.INTEGER(10),
        allowNull:false
    }
})