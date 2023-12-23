const mongoose = require('mongoose');
const env = require('./environment');

//mongoose.connect('mongodb://127.0.0.1/codial_development');
mongoose.connect(`mongodb+srv://anuragv8269:Tqsg8dnRstsn6MzR@cluster0.gvbrybd.mongodb.net/${env.db}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connection with Mongodb'));

db.once('open', function(){
    console.log('Database Connected Successfully');
});


module.exports = db;