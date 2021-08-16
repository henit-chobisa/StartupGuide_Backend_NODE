const jwt = require('jsonwebtoken');

const accessTokenSecret = 'bfwbfwefewjfewhfkweroitj4witji42jtniwitvjwutw094eut0w4u';
const refreshTokenSecret = 'ncruw9u9u2r90nu2n9ru24ur490niu43nut934ntn43tvn3424i34ir2';

const authenticateJWT = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(authHeader) {
        const token = authHeader.split('  ')[1];
        console.log(token);
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                res.send(err);
            }
            req.user = user;
            next();
        });
    }
    else {
        res.status(404);
    }
};

module.exports = authenticateJWT;