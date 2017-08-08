const jwt = require('jsonwebtoken');

module.exports = {
    jwtAuth: (req, res, next) => {
        /* Verify Token */
        //const secret = APPLICATIONCONFIG.jwtSecret || 'secret12345679';

        /* Non-authenticated paths */
        const nonSecurePaths = ['/api/users','/api/login'];
        const methods = ['POST','GET'];
        if (nonSecurePaths.includes(req.path) && methods.includes(req.method)) { 
            next();
        } else { 
             //Check header or url parameters or post parameters for token
            //const token = req.body.token || req.query.token || req.headers.authorization;
            const token = req.headers.authorization;
            if (token) {
                jwt.verify(token, app.get('superSecret'), (err) => {
                    if (err) { 
                        return res.json({ success: false, message: 'Failed to authenticate token.' });
                    }
                    next();
                });
            } else {
                // If there is no token
                return res.status(403).send({
                    message: 'No token provided.'
                });
            }
        }
    }
};