const bcrypt = require('bcryptjs');


const hashPassword = (password) => {
        // Hash Passsword 
        const salt = bcrypt.genSaltSync(10);
        const hassPassword = bcrypt.hashSync(password, salt)
        return hassPassword;
};


// module exports 
module.exports = hashPassword