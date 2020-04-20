const mongoose = require('mongoose')
const memberSchema = new mongoose.Schema({
    userid:{
        type: String,
        required: true
    },
    projectid:{
        type: String,
        required: true
    },
    role:{
        type: String

    },
    name:{
        type: String,
        required: true
    },
    approve:{
        type: String,
    }


})

module.exports = mongoose.model('member',memberSchema)