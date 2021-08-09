require('dotenv').config()
const ENV = process.env
const { 
    STATUS,
    ERROR_MESSAGE
 } = require("../config/errors")
const { 
    verifyTokenForUser
} = require("../utils/functions")

module.exports={
    requiredAuthenticationForAccessToken: function(strict){
        return async function(req,res,next){
            if(strict){
                try {
                   let auth_token = req.headers['access-token'].split(' ')[1] 
                   verifyTokenForUser(auth_token)
                   .then(res=>{     
                      req.user = res  
                      next()         
                   })
                   .catch(error=>{
                    return res.status(STATUS.UNAUTHORIZED_REQUEST).send(ERROR_MESSAGE.VALID_ACCESS_TOKEN_NOT_FOUND)
                   })
                } catch (error) {   
                  return res.status(STATUS.UNAUTHORIZED_REQUEST).send(ERROR_MESSAGE.VALID_ACCESS_TOKEN_NOT_FOUND)
                }
            }
        }
    },
    requiredAuthenticationForUserAgent:function(strict){
        return function(req,res,next){
            if(strict){
                let user_machine = req.headers['user-agent']
                let allowed_agents = ENV.ALLOWED_AGENTS.split(",")
                if(allowed_agents.includes(user_machine)){
                    next()
                }
                else{
                    return res.status(STATUS.UNAUTHORIZED_REQUEST).send(ERROR_MESSAGE.VALID_USER_AGENT_NOT_FOUND) 
                }
            }
        }
    }
}