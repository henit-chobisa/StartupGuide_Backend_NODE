const jwt = require('jsonwebtoken');

const accessTokenSecret = 'bfwbfwefewjfewhfkweroitj4witji42jtniwitvjwutw094eut0w4u';

const authenticate = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(authHeader) {
        const token = authHeader.split(' ')[1];
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

module.exports = authenticate;