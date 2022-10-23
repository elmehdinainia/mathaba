const express = require('express')
const app = express()
// const dotenv = require('dotenv')
const route = require('./routes/auth.js')
const mongosse =require('mongoose')
const dbmgs = require('./db/db')
const env = require('dotenv').config()
const port = process.env.PORT 




//import Routes
const authroute = require('./routes/auth.js')
//route middlweare
app.use(express.json())

app.use('/api/user',route)


app.listen(port,()=>console.log('app is running'))
