const mongoose = require('mongoose');



// Create user Schima 
const userSchima = mongoose.Schema({
    name : {
        type : String, 
        required : true,
        trim : true
    }, 
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    userName : {
        type : String,
        trim : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    isActivate : {
        type : Boolean,
        default : false
    },
    isAdmin : {
        type : Boolean,
        default : true
    },
    phone : {
        type : String,
        trim : true
    },
    gender : {
        type : String,
        trim : true,
        enum : ['Male', 'Female']

    },
    location : {
        type : String,
        trim : true,
    },
    skill : {
        type : String,
        trim : true,
    },
},
{
    timeStamps : true
});




// module export 
module.exports = mongoose.model('User', userSchima)