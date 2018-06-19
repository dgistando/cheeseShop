const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Cheese');

var db = mongoose.connection;
db.on('error', () => {console.log("Failed to connect to mongoose")})
db.once('open', () => {console.log("Connected to mongoose!")})

var Schema = mongoose.Schema

var infoSchema = new Schema({
    //id : Int
    Name : String,
    Link : String,
    Img : String,
    Made : String,
    Country_of_origin : String,
    Family : String,
    Type : String,
    Fat_content : String,
    Calcium_content : String,
    Texture : String,
    Rind : String,
    Colour : String,
    Flavour : String,
    Aroma : String,
    Vegetarian : String,
    Producers : String,
    Synonyms : String,
    Alternative_spelling : String,
    Fat_dry : String
},{collection : "info"})

var Info = mongoose.model('Info', infoSchema)

//export default Info
module.exports = Info