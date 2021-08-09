const {Router} = require('express')
const router =  Router()
const {
  requiredAuthenticationForAccessToken,
  requiredAuthenticationForUserAgent
} = require('../middlewares/authentication')
const {
   STATUS,
   ERROR_MESSAGE
} = require('../config/errors')
require('dotenv').config()
const ENV =process.env
const {
    getRandomIdForUser,
    hashing,
    genarateTokenForUserById,
    verifyHashedPassword
} = require('../utils/functions')
const {
   user
} = require('../model')
const sequelize = require('../database/connection')

//create_user
router.post(
    '/create',
    async(req,res)=>{
       try {
        const {name,password} = req.body
        let id =await getRandomIdForUser()
        let amount = ENV.BASIC_AMOUNT_FOR_NEW_USER
        let pass = await hashing(password)
        await user.create({id,name,password:pass,amount}).catch(err=>{
            return res
            .status(STATUS.INTERNAL_SERVER_ERROR)
            .send({error:err})
        })
        let token = await genarateTokenForUserById(id)
        token===null?res.status(STATUS.INTERNAL_SERVER_ERROR).send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR):res.status(STATUS.CREATED).send(token) 
       } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).send({
            message:ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            ...error
        }) 
       }   
    }
)

// fetch perticular user
router.get(
    '/fetch',
    requiredAuthenticationForAccessToken({strict:true}),
    requiredAuthenticationForUserAgent({strict:true}),
    async(req,res)=>{
       try {    
        let user_id = req.user.id   
        let userObejct = await user.findAll({
            where:{
                id:user_id
            },
            attributes: { 
                exclude: ['password'] 
            }
        })
        userObejct.length?res.status(STATUS.SUCCESS).send(userObejct):res.status(ERROR_STATUS.NOT_FOUND).send(ERROR_MESSAGE.USER_NOT_FOUND)
       } catch (error) {
           res.status(STATUS.INTERNAL_SERVER_ERROR).send({
               message:ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
               ...error
           })
       }
    }
)

router.post(
    '/auth',
    async(req,res)=>{
        try {
        let {name,password} = req.body
        let intial = 0
        let isUserWithThisName = await user.findAll({
            where:{
                name:name
            }
        })
        async function thowUserNotFoundError(){
           res.status(STATUS.UNAUTHORIZED_REQUEST).send(ERROR_MESSAGE.INVALID_CREDENTIALS)
        }
        async function passwordValidation(){ 
            try{
                let currentUser = isUserWithThisName[intial] 
            let validpasswordForThisUser = await verifyHashedPassword(password,currentUser['password'])
            validpasswordForThisUser?res.status(STATUS.SUCCESS).send(await genarateTokenForUserById(currentUser['id'])):res.status(STATUS.UNAUTHORIZED_REQUEST).send(ERROR_MESSAGE.INVALID_CREDENTIALS)
            }catch(error){
                res.status(STATUS.INTERNAL_SERVER_ERROR).send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR)
            }
          }
        if(isUserWithThisName){passwordValidation()}
        else {thowUserNotFoundError()}
        } catch (error) {
            res.status(STATUS.INTERNAL_SERVER_ERROR).send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR)
        }
    }
)

router.post(
    '/balance',
    requiredAuthenticationForAccessToken({strict:true}),
    requiredAuthenticationForUserAgent({strict:true}),
    async(req,res)=>{
        try {
            let user_id = req.user.id
        let user_data =await user.findAll({
            where:{
                id:user_id
            },
            attributes:[['amount','balance']]
        })
         res.status(STATUS.SUCCESS).send(user_data)
        } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).send(
            {
                message:ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
                ...error
            }
        )
        }
    }
)
module.exports=router