const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/codial_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connection with Mongodb'));

db.once('open', function(){
    console.log('Database Connected Successfully');
});


module.exports = db;