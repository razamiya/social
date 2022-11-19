

const sessionRes =  (mcg, redirect, req, res) => {
    req.session.message = mcg ;
    res.redirect(redirect);


}



module.exports = sessionRes ;