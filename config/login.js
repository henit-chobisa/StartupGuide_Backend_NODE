const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const refreshTokens = require('../middleWare/refreshTokens');

const accessTokenSecret = 'bfwbfwefewjfewhfkweroitj4witji42jtniwitvjwutw094eut0w4u';
const refreshTokenSecret = 'ncruw9u9u2r90nu2n9ru24ur490niu43nut934ntn43tvn3424i34ir2';


router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await Admin.findOne({email});
        
        if (user == null){
            res.send("Sorry, this email doesn't exist, try registering first");
        }
        else {
            const validation = crypto.pbkdf2Sync(password, user.salt, 1000, 64, `sha512`).toString(`hex`);
            if (validation == user.hash) {
                const accessToken = jwt.sign({ username : name, email : email}, accessTokenSecret, {expiresIn: '20m'});
                const refreshToken = jwt.sign({ username : name, email : email}, refreshTokenSecret);
                refreshTokens.push(refreshToken);
                res.json({accessToken, refreshToken});
            } else {
                res.send("Incorrect password");
            }
        }
    }
    catch (err) {
        res.status(500);
        res.send(err.message);
    }

})

module.exports = router;