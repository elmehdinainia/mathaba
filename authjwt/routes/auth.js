const routes = require('express').Router()
const modelt =require('../controllers/ctrl')
const vertoke=require('../verification')




routes.post('/register',modelt.register)


routes.post('/update_password',modelt.update_password)



routes.post('/login',modelt.login)

routes.get('/client',vertoke.verifiertoken(['client']),(req,res)=>{
    res.send("hello admin")

})
routes.get('/admin',vertoke.verifiertoken(['admin']),(req,res)=>{
    res.send("hello admin")

})
routes.get('/client',vertoke.verifiertoken(['livreur']),(req,res)=>{
    res.send("hello livreur")

})


routes.get('/test/:token',modelt.test)



module.exports =routes