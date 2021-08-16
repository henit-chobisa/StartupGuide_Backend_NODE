const express = require('express');
const Admin = require('../models/Admin')
const crypto = require('crypto');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await Admin.findOne({ email });
        if (user == null) {
            const salt = crypto.randomBytes(16).toString('hex');
            const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
            user = await new Admin({ name, email, salt, hash});
            console.log(user)
            user.save();
            res.send('Ok, User added');
        }
        else {
            res.send("Sorry, this person already exist");
        }
    }catch (err){
        res.send(err.message);
    }

})

module.exports = router;