const mongoose = require('mongoose');
const config = require('../config');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(config.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) {
        console.log(`Error connecting to db ${err}`);
    }
    console.log(`connected to db`);

})


module.exports.User = require('./user');
module.exports.Poll = require('./poll');