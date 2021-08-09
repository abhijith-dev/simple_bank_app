const {Router} = require('express')
const router = Router()
const {
 STATUS,
 ERROR_MESSAGE
}= require('../config/errors')
const {
   requiredAuthenticationForAccessToken,
   requiredAuthenticationForUserAgent
} = require('../middlewares/authentication')
const {
    transactions
}= require('../model')

router.get(
    '/',
    requiredAuthenticationForAccessToken({strict:true}),
    requiredAuthenticationForUserAgent({strict:true}),
    async(req,res)=>{
        try {
            let user_id = req.user.id
        let type = req.query.type
        let types =['sender','reciever']
        let status = types[parseInt(type)-1]
        let details = await transactions.findAll({
            where:{
                userId:user_id,
                status:status
            },
            attributes:['transaction_id','createdAt','amount']
        })
        res.status(STATUS.SUCCESS).send(details)
        } catch (error) {
            res.status(STATUS.INTERNAL_SERVER_ERROR).send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR)
        }
    }

)

module.exports=router