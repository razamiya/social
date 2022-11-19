const mongoose = require('mongoose');


// MOngo Db connection
const mongoDBconnect = () => {
    try {

        const connect = mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongo DB Connection susseccfull`.bgCyan.black);

    } catch (error) {
        console.log(error.message);
    }
}


// module Exports
module.exports = mongoDBconnect