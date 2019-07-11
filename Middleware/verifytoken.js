const jwt = require('jsonwebtoken');
 
module.exports = function (req, res, next) {
 
    const token = req.body.token;
    if (!token) {
        return res.status(401).send('Access denied. No JWT provided.');
    }
 
    try {
        const decoded = jwt.verify(token, 'privateKey', {expiresIn:'3600s'});
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid JWT.');
    }
}