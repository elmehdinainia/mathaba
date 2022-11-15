const routes = require('express').Router()
const controller =require('../controllers/ctrl')
const vertoke=require('../verification')




routes.post('/register',controller.register)



// routes.get('/update_password/:token',modelt.update_password)
routes.post('/update_password/:token',controller.update_password)



routes.post('/login',controller.login)

routes.get('/client',vertoke.verifiertoken(['client']),(req,res)=>{
    res.send("hello admin")

})
routes.get('/admin',vertoke.verifiertoken(['admin']),(req,res)=>{
    res.send("hello admin")

})
routes.get('/client',vertoke.verifiertoken(['livreur']),(req,res)=>{
    res.send("hello livreur")

})
routes.post('/forgetpassword',controller.forgetpasword)

routes.get('/verificationemail/:token',controller.verificationemail)



module.exports =routes