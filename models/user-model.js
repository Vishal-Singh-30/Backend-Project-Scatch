const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/scatch');

const userSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cart: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ],
    isadmin:{
        type:Boolean,
        default:false
    },
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Order'
        }
    ],
    contact:{
        type: Number,
    },
    picture:{
        type: String
    }

});

module.exports = mongoose.model('User', userSchema);

