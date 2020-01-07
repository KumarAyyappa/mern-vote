const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost/vote`, { useNewUrlParser: true }, (err, res) => {
    if (err) {
        console.log(`Error connecting to db ${err}`);
    }
    console.log(`connected to db`);

})


module.exports.User = require('./user');
module.exports.Poll = require('./poll');