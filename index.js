const express = require('express')
const app = express()
const cors = require('cors')

// const dotenv = require('dotenv')
const mongosse =require('mongoose')
const dbmgs = require('./db/db')
const env = require('dotenv').config()
const port = process.env.PORT 



// liaison entre le backend et le frontend 
app.use(cors());
//import Routes
const route = require('./routes/auth.js')

//route middlweare
app.use(express.json())
app.use('/api/user',route)


app.listen(port,()=>console.log('app is running'))
