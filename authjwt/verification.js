const jwt = require('jsonwebtoken')
const ls = require('local-storage')
const env = require('dotenv').config()
const ctrl=require('./controllers/ctrl.js')

function verifiertoken(data){
    return (req,res,next)=>{
    if(ls('token')){
      const reqToken = jwt.verify(ls('token'),process.env.SECRET)
      if(reqToken){
        req.user = reqToken
        if(data.includes(req.user.user.role)){// user1=usrrtoken ; user2:userbd
            next()
        }else{
            res.send('acess refuse')
        }
      }else{
        res.send('refuse token') 
      }
    }else{
        res.send(' token nest existe pas !!!') 
    }
}
}
module.exports ={verifiertoken}