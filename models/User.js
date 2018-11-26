var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//Create User model
var userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
        required: false
    },
    date:{
        type: Date,
        dafault: Date.now
    }
});//end User model
module.exports= User = mongoose.model('User', userSchema);