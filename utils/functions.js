require('dotenv').config()
const suger = require('bcryptjs')
const ENV = process.env
const tokenizer =  require('jsonwebtoken')
module.exports={
    getRandomIdForUser:async()=>{
        let RANDOMIZABLE = ENV.RANDOM_DATA
        let MAX = ENV.ID_LENGTH
        let KEY = ``
        for(let i=1;i<MAX;i++){
           KEY+=RANDOMIZABLE[Math.floor(Math.random()*RANDOMIZABLE.length)].toString()
        }
        return KEY
    },
    hashing:async(password)=>{
       let hash = await suger.hash(password,10)
       return hash
    },
    verifyHashedPassword:async(user_enetered,db_having)=>{
      let confirm =await suger.compare(user_enetered,db_having)
      return confirm
    },
    genarateTokenForUserById:async(id)=>{
        try{
          let tk = await  tokenizer.sign({id},ENV.JWT_SECRET)
          return tk
        }
        catch(error){
          return null
        }
    },
    verifyTokenForUser:async(token)=>{
        try{
            let id =await tokenizer.verify(token,ENV.JWT_SECRET)
            return id
          }
          catch(error){
            return null
          }   
    },
    generateTranasactionId:async()=>{
      let RANDOMIZABLE = ENV.RANDOM_DATA
        let MAX = ENV.TRANSACRION_ID_LENGTH
        let KEY = ``
        for(let i=1;i<MAX;i++){
           KEY+=RANDOMIZABLE[Math.floor(Math.random()*RANDOMIZABLE.length)].toString()
        }
        return KEY
    }
}
