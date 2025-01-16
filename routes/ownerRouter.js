const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");

if(process.env.NODE_ENV === "development"){
    router.post('/create', async (req, res) => {
        let owners = await ownerModel.find();
        if(owners.length > 0){
            return res.send("Owner already exists").status(503);
        }
        let {fullname, email, password, gstin} = req.body;
        let createdOwner =  await ownerModel.create({
            fullName:fullname,
            email:email,
            password:password,
            gstin:gstin,
        })
        res.send(createdOwner).status(201);
    })
}



router.get('/', (req, res) => {
    res.send("hey");
});




module.exports = router;

