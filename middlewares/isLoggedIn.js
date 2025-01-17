const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async (req, res, next) => {
    if(!req.cookies.token){
        req.flash('error', 'Please login first');
        return res.redirect('/');
    }

    try{
        // extract data from  token
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

        // get all details of user except password
        let user = await userModel.findOne({email: decoded.email}).select('-password');
        req.user = user;
        next();

    }catch(err){
        req.flash('error', 'Something went wrong');
        return res.redirect('/');
    }
};