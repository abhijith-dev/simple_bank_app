# Simple Bank App

![simple bank app](https://media-eng.dhakatribune.com/uploads/2019/06/web-bank-bigstock-edited-1560438358788.jpg)

## API Services for User

***
### Create User

> url :http://localhost:3000/users/crate [POST]

#### request body

```
{
    name:'',
    password:''
}
```
***

### Login User

> url :http://localhost:3000/users/auth [POST]

#### request body

```
{
    name:'',
    password:''
}
```
***

### fetch User

> url :http://localhost:3000/users/fetch [GET]

#### request body

> access-token required

***

***
### Check user balance

> url :http://localhost:3000/users/balance [POST]

#### request body

>need access-token

***

## API Service for Payment
***
### make payment

> url :http://localhost:3000/payment/make [POST]

#### request body
>access-token required
```
{
    amount:000,
    to:000
}
```

### Add money to Account

> url :http://localhost:3000/payment/add [POST]

#### request body

>access-token required
```
{
    amount:000,
}
```
***

## API Service for Transaction Details
***
### sender transaction 

> url :http://localhost:3000/transactions/?type=1 [GET]
> 
>access-token required
***
### reciever transaction 

> url :http://localhost:3000/transactions/?type=2 [GET]
> 
>access-token required

```
