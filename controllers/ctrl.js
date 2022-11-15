const mongoose = require('mongoose')
const User = require('../models/User') 
const bcrypt = require('bcryptjs')
const env = require('dotenv').config()
const jwt = require('jsonwebtoken')
const ls = require('local-storage')
const {transport} = require('../nodemailer')
const { findOne } = require('../models/User')

/** 
 * methode => post
 * URl => /api/auth/register 
 * access => pulic
 */

const register = async function(req,res){
    const {body} = req
    const emailExist = await User.findOne({email:req.body.email})
    if(emailExist){
        return res.json({message: 'Email.aleady exists'})
    }
    const slat = await  bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(req.body.password,slat)

    const user = new User({
    ...body,
   
    password:  hashedpassword,
    verify: false
    })

    try{
        const saveUser = await user.save()
        ls('email', user.email)
        const token = jwt.sign({email:user.email}, process.env.SECRET)
            // res.header('token', token).send(token)
            // res.send(token)
        let info = {
            from :'"mehdi 👻" <nainiaamehdi25@gmail.com',
            to: user.email,
            subject:"confirmation votre compte",
            text: "Hello verifier your email",
            html:
              `<div style='height: 150px; width: 100%;'>
              <h3>Hy dear,</h3>
              <p>welcome to <span style='font-weight: bold;'>MARHABA</span>, click button for active your account.</p>
              <br>
             <a href="http://localhost:4000/api/user/verificationemail/${token}" style="height: 60px; background-color: #199319; color: white; padding: 15px 25px; text-decoration: none; border-radius: 8px; margin-bottom: 10px; margin-top: 10px;">Active</a> 
            </div>`,
       
        }

        console.log('Email is sended')
        transport.sendMail(info)
        res.json({message:"Account Verified Succefully but u need verify email"})
    }catch(err){
        res.send(err)
    }
}












const login= async function(req,res){
    //chek email is existing
    const user = await User.findOne({email:req.body.email})
    if(user && user.verify){
        const validpass = await bcrypt.compare(req.body.password, user.password)
        if(validpass){
            const token = jwt.sign({user},process.env.SECRET)
            // res.header('token', token).send(token)
            // res.send(token)
            ls('token',token)
            
     res.json(
        {msg : 'login successfuly', 
            token,
            user:user}
            )

        }else{
            return res.json({msg:'password is not valid'})
        }
    }else{
        return res.send({msg:'Email not found'})
    }
    
    //password is correct
}

const update_password = async function(req,res){
 try{
    const token = req.params.token
    const user = jwt.verify(token, process.env.SECRET)
    const result = await User.findOne({email: user.email})
    const passnew = req.body.password
    console.log(result)
    if(result){
        const slat = await  bcrypt.genSalt(10)

        bcrypt.hash(passnew,slat)
            .then(hash=>{
                result.password = hash;
                result.save()
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






const verificationemail = async function(req, res) {
    const token = req.params.token;
    const email = jwt.verify(token, process.env.SECRET)

    User.updateOne({email:email.email}, {$set: {verify: true}})
        .then(user=>{
            res.json(user)
        })
        .catch(()=>{res.send('error')})
}









const forgetpasword = async function(req,res){
    
    
    user = await User.findOne({email: req.body.email})
    if(!user){
        res.send("got to register email n'est pas exist")
    }else{
        const token = jwt.sign({email:user.email}, process.env.SECRET)
        let info = {
            from :'"mehdi 👻" <nainiaa  mehdi25@gmail.com',
            to: user.email,
            subject:"forget password",
            text: "Forget password",
            html:
              `<div style='height: 150px; width: 100%;'>
              <h3>Hy dear,</h3>
              <p>welcome to <span style='font-weight: bold;'>MARHABA</span>, click button for reset your password.</p>
              <br>
             <a href="http://localhost:3000/Ressetpassword/${token}" style="height: 60px; background-color: #199319; color: white; padding: 15px 25px; text-decoration: none; border-radius: 8px; margin-bottom: 10px; margin-top: 10px;">Reset pass</a> 
            </div>`,
       
        }
    
        console.log('Email is sended')
        transport.sendMail(info)
        res.send("Email is send verifier gmail ")
    }

}




module.exports ={
    register,
    login,
    update_password,
    verificationemail,
    forgetpasword
}