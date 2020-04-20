const mongoose = require('mongoose')
const projectSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    usercreatorid:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }


})

module.exports = mongoose.model('Projet',projectSchema)