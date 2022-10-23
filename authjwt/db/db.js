const mongosse = require('mongoose')
const mgdb =mongosse.connect('mongodb+srv://jwtmehdi:jwt1213@mehdijwt.2kgjpcc.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log('connexuin')
})
.catch(()=>{
    console.log('error')
})

module.exports ={mgdb}