const mongoose = require('mongoose')


userSchema = new mongoose.Schema({
    name: {
        type : String, 
        required:true,
        min : 6,
        max:255
    },
    email: {
        type : String, 
        required:true,
        min : 6,
        max:255
    },
    password: {
        type : String, 
        required:true,
        max:255
    },
    role: {
        type : String, 
        required:true,
        max:255,
        default: 'client'
    },
    verify: {
        type : Boolean,
        required: true,
        max: 255
    }
});
const shema = mongoose.model('User',userSchema)
module.exports = shema



