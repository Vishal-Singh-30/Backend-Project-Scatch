const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');


module.exports.registerUser = async (req, res) => {
    try{
        let {fullname, email, password} = req.body;

         let user = await userModel.findOne({email:email});
         if(user){
             return res.send("User already exists").status(503);
         }
        
       bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            if(err){
                res.send(err.message);
            }else{
                let user = await userModel.create({
                    fullName:fullname,
                    email:email,
                    password:hash
                });
                let token = generateToken(user);
                res.cookie('token', token); // set token as cookie
                res.send("User created successfully").status(201);
            }
        })
       });
    }catch(err){
        res.send(err.message);
    }
};

module.exports.loginUser = async (req, res) => {
    let {email, password} = req.body;

    let user = await userModel.findOne({email:email});
    if(!user){
        return res.send("User not found").status(404);
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if(result){
            let token = generateToken(user);
            res.cookie('token', token); // set token as cookie
            res.send("User logged in successfully").status(200);
        }else{
            res.send("Invalid Email or Password").status(401);
        }
    })
};