const mongoose = require('mongoose')
const assetSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    userid:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    },
    projectid:{
        type: String,
        required: true
    }


})

module.exports = mongoose.model('Asset',assetSchema)