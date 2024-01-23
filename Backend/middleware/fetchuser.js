const jwt = require("jsonwebtoken");

const jwt_secreat = "shyamisagoodboy";

const fetchuser = (req, res, next)=>{
    // Get the user from the jwt token
    const token = req.header('auth-token')
    if(!token){
        res.stauts(401).send({error: "Please authenticate using valid token"})
    }
    try {
        const data = jwt.verify(token, jwt_secreat);
        req.user = data.user;
        next();
    } catch (error) {
        res.stauts(401).send({error: "Please authenticate using valid token"})
    }
}

module.exports = fetchuser;