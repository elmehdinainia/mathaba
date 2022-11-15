
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
mgdb = mongoose.connect(process.env.conexionmg)
.then(()=>{
    console.log('connexuin')
})
.catch(()=>{
    console.log('aucun connexion')
})

module.exports ={mgdb}