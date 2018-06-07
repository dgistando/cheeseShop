/**
 * 
 * Was using the mongo client but decided it want to use Stream/Cursors
 * move bulk data in at once.
 * 
 */
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://127.0.0.1:27017/db';
 
//const dbName = "cheesy"

MongoClient.connect(url, {useNewUrlParser : true}, function(err, client){
    assert.equal(null, err);
    console.log("Database connected!");

    //const db = client.db(dbName);

    client.close();
});
//console.log("something here");


//Example of a duplex stream to buffer data before a write
/////////////////////////////////////////////////////////
// const HOW_FAR = 100

// var arr = Array.apply(null, {length: HOW_FAR}).map(Number.call, Number)

// const inoutStream = new Duplex({

//     //This method should write to database
//     write(chunk, encoding, callback){
//         console.log(chunk.toString() + " s");
//         callback()
//     },

//     //call this method from inside the promise from cheerio
//     read(size){
//         this.push(arr[this.iter].toString())
//         this.iter = this.iter + 1
//         if(this.iter > HOW_FAR-1){
//             this.push(null)
//         }
//     }
// })

// inoutStream.iter = 0;

// process.stdin.pipe(inoutStream).pipe(inoutStream)
