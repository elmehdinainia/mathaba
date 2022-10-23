
const User = require('../models/User') 
const bcrypt = require('bcryptjs')
const env = require('dotenv').config()
const jwt = require('jsonwebtoken')
const ls = require('local-storage')
// const vervtok=require('../verification')
const sendCofirmationEmail = require('../nodemailer')

const register= async function(req,res){

    //chexk if user is already registered
    const emailExist = await User.findOne({email:req.body.email})
    if(emailExist){
        return res.status(400).send('Email.aleady exists')
    }
    //HASH THE PASSWORD
    const slat = await  bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(req.body.password,slat)

    //CREATEA NEW USER
    const user = new User({
    name:req.body.name,
    email:req.body.email,
    password:  hashedpassword,
    role:req.body.role,
    verify: false
    })

    try{
        const saveUser = await user.save()
        ls('email', user.email)
        sendCofirmationEmail.sendCofirmationEmail(user.email)
        res.json({saveUser})
    }catch(err){
        res.status(400).send(err)
    }
}

const login= async function(req,res){
    //chek email is existing
    const user = await User.findOne({email:req.body.email})
    if(user && user.verify){
        const validpass = await bcrypt.compare(req.body.password, user.password)
        if(validpass){
         
            const token = jwt.sign({user},process.env.SECRET)
            // res.send(token)
            ls('token',token)
            res.send(ls('token'))
        }else{
            return res.status(400).send('invalide password')
        }
    }else{
        return res.status(400).send('Email not found')
    }
    
    //password is correct
}

const update_password = async function(req,res){
 try{
    const emailnew = req.body.email
    const passnew = req.body.password
    const data = await User.findOne({email:emailnew})
    if(data){
        const slat = await  bcrypt.genSalt(10)

        bcrypt.hash(passnew,slat)
            .then(hash=>{
                data.password = hash;
                data.save()
                res.status(200).send({message:"password updated"})
            })
            .catch(()=>{res.json({error: 'error'})})
    }else{
        res.status(200).send({message:"password not updated"})
    }
 }
 catch(err){
  res.status(400).send(err.message)
 }
}

const test = async function(req, res) {
    const token = req.params.token;
    const email = jwt.verify(token, process.env.SECRET)

    User.updateOne({email:email.email}, {$set: {verify: true}})
        .then(user=>{
            res.json(user)
        })
        .catch(()=>{res.send('error')})
}





module.exports ={
    register,
    login,
    update_password,
    test
}