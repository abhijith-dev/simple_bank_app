const {
   generateTranasactionId
} = require('../utils/functions')
module.exports={
    validate:async(id,amount,collection,intial)=>{
        
        let user =await collection.findAll({
            where:{
                id:id
            }
        })
        if(user[intial].amount>=amount){
            return true
        }
        else{
            return false
        }
    },
    makeTransaction:async(id,collection,to,amount,initial)=>{
        let current_reciever_balance = await collection.findAll({
            where:{
                id:to
            },
            attributes:['amount']
        })
        let reciever_balance = current_reciever_balance[initial]['amount']
        await collection.update({
            amount:parseInt(reciever_balance)+parseInt(amount)
        },
        {
            where:{
                id:to
            }
        })
        let current_sender_balance = await collection.findAll({
            where:{
                id:id
            },
            attributes:['amount']
        })
        let sender_balance = current_sender_balance[initial]['amount'] 
        await collection.update({
            amount:parseInt(sender_balance)-parseInt(amount)
        },
        {
            where:{
                id:id
            }
        })
    },
    makeTransactionEntry:async(id,collection,to,amount)=>{
        let tranasaction_id = await generateTranasactionId()  
        await collection.create({
            transaction_id:tranasaction_id,
            userId:id,
            status:'sender',
            amount:amount
        })
        await collection.create({
            transaction_id:tranasaction_id,
            userId:to,
            status:'reciever',
            amount:amount
        })
       return tranasaction_id
    },
    rollback:async(params,initial)=>{
        let intial = parseInt(initial)
       if(params[initial]==='payment_issue'){
        let current_sender_balance = await params[initial+4].findAll({
            where:{
                id:params[initial+1]
            },
            attributes:['amount']
        })
        let sender_balance = current_sender_balance[initial]['amount']

        let current_reciever_balance = await params[initial+4].findAll({
            where:{
                id:params[initial+2]
            },
            attributes:['amount']    
        })
        let reciever_balance = current_reciever_balance[initial]['amount']
        console.log(initial)
        await params[parseInt(initial)+4].update({

            amount:sender_balance
        },
        {
            where:{
                id:params[initial+2]
            }
        })
        await params[intial+4].update({

            amount:reciever_balance
        },
        {
            where:{
                id:params[initial+2]
            }
        })
       }
    }
}