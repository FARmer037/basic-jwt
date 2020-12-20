const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).send("Access Denied!");
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send("Token Invalid");
    }
}

module.exports = verify;