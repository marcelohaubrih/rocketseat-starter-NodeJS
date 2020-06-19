const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const authHeaders = req.headers.authorization;
    
    if(!authHeaders){
        return res.status(401).send({ error: 'No token provider'});
    }

    const parts = authHeaders.split(' ');

    if(!parts.length ===2){
        return res.status(401).send({ error: 'token error'});
    }

    const [ scheme, token ] = parts;
    console.log(scheme);
    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({ error: 'token malformated'});
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err){
            return res.status(401).send({ error: 'token invalid' });
        }
        req.userId = decoded.id
        //console.log(decoded);
        return next();
    })
}