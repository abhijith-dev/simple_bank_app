# Simple Bank App

![simple bank app](https://img.etimg.com/thumb/msid-77583044,width-1200,height-900,imgsize-125244,resizemode-8,quality-100/markets/stocks/news/foreign-banks-to-seek-more-time-some-concessions.jpg)

## API Services for User

***
### Create User

> url :http://localhost:3000/users/crate

#### request body

```
{
    name:'',
    password:''
}
```
***

### Login User

> url :http://localhost:3000/users/auth

#### request body

```
{
    name:'',
    password:''
}
```
***

### fetch User

> url :http://localhost:3000/users/fetch

#### request body

> access-token required

***

***
### Check user balance

> url :http://localhost:3000/users/balance

#### request body

>need access-token

***

## API Service for Payment
***
### make payment

> url :http://localhost:3000/payment/make

#### request body
>access-token required
```
{
    amount:000,
    to:000
}
```

### Add money to Account

> url :http://localhost:3000/payment/add

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

> url :http://localhost:3000/transactions/?type=1
> 
>access-token required
***
### reciever transaction 

> url :http://localhost:3000/transactions/?type=2
> 
>access-token required

```
