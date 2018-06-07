mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Cheese');

var db = mongoose.connection;
db.on('error', () => {console.log("Failed to connect to mongoose")})
db.once('open', () => {console.log("Connected to mongoose!")})

