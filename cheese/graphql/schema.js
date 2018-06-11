const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Cheese');

var db = mongoose.connection;
db.on('error', () => {console.log("Failed to connect to mongoose")})
db.once('open', () => {console.log("Connected to mongoose!")})

var Schema = mongoose.Schema

var infoSchema = new Schema({
    name : String,
    link : String,
    Made : String,
    origin : String
},{collection : "info"})

var Info = mongoose.model('Info', infoSchema)

//export default Info
module.exports = Info