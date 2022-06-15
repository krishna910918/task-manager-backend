const jwt = require('jsonwebtoken');

exports.authenticated = async(req, res, next) => {

    if(req.headers.authorization) {

        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token,'test');

        req.user = user;
    
    } else {
        return res.status(401).json({message : "Login to access"});
    }

    next();
}