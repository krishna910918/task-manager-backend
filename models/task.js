const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({

    task : {
        type : String,
        required : true
    },

    author : {
        type : String,
        required : true
    },

    time : {
        type : Date,
        default : new Date()
    }


})

module.exports = mongoose.model('Task',taskSchema);

