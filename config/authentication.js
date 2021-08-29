const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const { request } = require('http');

const accessTokenSecret = 'bfwbfwefewjfewhfkweroitj4witji42jtniwitvjwutw094eut0w4u';
const refreshTokenSecret = 'ncruw9u9u2r90nu2n9ru24ur490niu43nut934ntn43tvn3424i34ir2';
const refreshTokens = [];

router.post('/login', async (req, res) => {
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
                console.log(refreshTokens)
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

router.post('/register', async (req, res) => {
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

});
router.post('/token', (req, res) => {
    const { token } = req.body;

    if (!token) { 
        console.log('Token is present')
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        console.log(refreshTokens)
        console.log('token is not included in refresh tokens')
        return res.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });

        res.json({ accessToken });
    });
});

module.exports = router;