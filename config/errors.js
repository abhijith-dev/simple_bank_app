module.exports={
    STATUS:{
        NOT_FOUND:404,
        BAD_REQUEST:400,
        CREATED:201,
        SUCCESS:200,
        INTERNAL_SERVER_ERROR:500,
        UNAUTHORIZED_REQUEST:401,
        SUCCESS_PAYMENT:200,
        PAYMENT_FAILED:502,
        INSUFFICIENT_BALANCE:406
    },
    ERROR_MESSAGE:{
        USER_NOT_FOUND:'user not found',
        INTERNAL_SERVER_ERROR:'internal server error',
        INVALID_CREDENTIALS:'invalid credentails provided',
        VALID_ACCESS_TOKEN_NOT_FOUND:'invalid access token',
        VALID_USER_AGENT_NOT_FOUND:'invalid user machine',
        PAYEMENT_FAILED :'payment failed',
        INSUFFICIENT_BALANCE_ERROR :'insufficient balance'


    }
}