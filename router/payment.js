const {Router} = require('express')
const router = Router()
const {
  user,transactions
} = require('../model/index')
const {
   STATUS,
   ERROR_MESSAGE
} = require('../config/errors')
const {
   makeTransaction,
   validate,
   makeTransactionEntry,
   rollback
} = require('../utils/paymentcontroller')
const {
   requiredAuthenticationForAccessToken,
   requiredAuthenticationForUserAgent
} = require('../middlewares/authentication')

router.post(
    '/make',
    requiredAuthenticationForAccessToken({strict:true}),
    requiredAuthenticationForUserAgent({strict:true}),
    async(req,res)=>{
        try {
         let {to,amount} = req.body
         let isLegitAmount = await validate(req.user.id,amount,user,0)
         if(isLegitAmount){
            await makeTransaction(req.user.id,user,to,amount,0)
            .then(
               async()=>{
                await makeTransactionEntry(req.user.id,transactions,to,amount)
                .then(transcation_id=>res.status(STATUS.SUCCESS).send(transcation_id))
               }
            )
            .catch(
               async()=>{  
             await rollback(['payment_issue',req.user.id,to,amount,user],0)  
             .then(error=>res.status(STATUS.PAYMENT_FAILED).send(ERROR_MESSAGE.PAYEMENT_FAILED))
            }
            )
             
         }
         else{
            res.status(STATUS.INSUFFICIENT_BALANCE).send(ERROR_MESSAGE.INSUFFICIENT_BALANCE_ERROR)
         }
 
        } catch (error) {
           res.status(STATUS.INTERNAL_SERVER_ERROR).send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR)
        }
    }
)

router.post(
   '/add',
   requiredAuthenticationForAccessToken({strict:true}),
   requiredAuthenticationForUserAgent({strict:true}),
   async(req,res)=>{
      
      try {
         let {amount} = req.body
         let initial =0
         let current__balance = await user.findAll({
            where:{
                id:req.user.id
            },
            attributes:['amount']
        })
        let current_balance = current__balance[initial]['amount']
        await user.update({
            amount:parseInt(current_balance)+parseInt(amount)
        },
        {
            where:{
                id:req.user.id
            }
        })
        res.status(STATUS.SUCCESS_PAYMENT).send()
      } catch (error) {
         res.status(STATUS.PAYMENT_FAILED).send(ERROR_MESSAGE.PAYEMENT_FAILED)
      }

   }
)

module.exports=router