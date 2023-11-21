const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    // console.log(req.headers);
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log(authHeader);
    // console.log(req.cookies);
    if (!authHeader?.startsWith('Bearer ')) {
        console.log("Here not verified jwt");
        return res.sendStatus(401);
    }
    const token = authHeader.split(' ')[1];
    console.log(token)
    // const token = req.cookies.jwt;
    // if (
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                console.log("Could not verify jwt");
                console.log(err.message);
                return res.sendStatus(403);
            }//invalid token
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    )
    //) console.log("verified");

}

module.exports = verifyJWT