const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const refreshTokens = require('../middleWare/refreshTokens');


router.post('/api/token', (req, res) => {
    const { token } = req.body;

    if (!token) { 
        return res.sendStatus(401);
    }
    if (!refreshTokens.includes(token)) {
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