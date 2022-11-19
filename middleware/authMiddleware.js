
const sessionRes = require("../utility/sessionRes");



const authMiddleware =  (req, res, next) => {

    const token = req.cookies.AuthUser  ;

    if (token) {
        sessionRes('You are authorize', '/', req, res);
    } else{
        next();
    }

};


// module export 
module.exports = authMiddleware ;