const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
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
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Order'
        }
    ],
    picture:{
        type: String
    },
    gstin:{
        type: String
    }

});

module.exports = mongoose.model('Owner', ownerSchema);

