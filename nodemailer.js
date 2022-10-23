const nodemailer = require('nodemailer')
const ls = require('local-storage')
const jwt = require('jsonwebtoken')



    function sendCofirmationEmail(email) {
        const token = jwt.sign({email}, process.env.SECRET)

        let transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
            user: "nainiaamehdi25@gmail.com",
            pass: "wzakmqattzeawzsy",
            }
        })

        let info = {
            from :'"mehdi 👻" <nainiaamehdi25@gmail.com',
            to: email,
            subject:"confirmation votre compte",
            text: "Hello verifier your email",
            html:
              `<div style='height: 150px; width: 100%;'>
              <h3>Hy dear,</h3>
              <p>welcome to <span style='font-weight: bold;'>MARHABA</span>, click button for active your account.</p>
              <br>
             <a href="http://localhost:5050/api/user/test/${token}" style="height: 60px; background-color: #199319; color: white; padding: 15px 25px; text-decoration: none; border-radius: 8px; margin-bottom: 10px; margin-top: 10px;">Active</a> 
            </div>`,
       
        }

        transport.sendMail(info);
        console.log('Email is sended')
        
    }


    // let transport = nodemailer.createTransport({
    //    service:"gmail",
    //   auth: {
    //     user: "nainiaamehdi25@gmail.com", // generated ethereal user
    //     pass: "Mahdi1213", // generated ethereal password
    //   },
    // });

//  module.exports.sendCofirmationEmail = (email) =>{
//     transport
//    .sendMail({
//     from :"nainiaamehdi25@gmail.com",
//     to:email,
//     subject:"confirmation votre compte"
//    })
// }  

module.exports = {
    sendCofirmationEmail
}
   