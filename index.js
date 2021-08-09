const express = require('express')
const app = express()
require('dotenv').config()
const ENV = process.env
const sequelize = require('./database/connection')
const log = console.log
app.use(require('cors')())
app.use(require('helmet')())
app.use(express.json())
require('./utils/relations')()

sequelize
.sync()
.then(result=>{
    log('success -> DB syncing')
})
.catch(err=>{
    log(`error while syncing :${err}`)
})
app.use('/users',require('./router/user'))
app.use('/payment',require('./router/payment'))
app.use('/transactions',require('./router/transaction'))
app.listen(ENV.PORT,err=>{
    if(!err){
      log(`server is running at port ->${ENV.PORT}`)  
    }
    else{
        log(`server error ${err}`)
    }
})