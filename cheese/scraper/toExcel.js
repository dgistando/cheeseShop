var fileSystem = require('fs')
var csv  = require('fast-csv')

/**
 * This was going to be used to save to a csv temporarily
 * and then insert to a DB. I just skipped this step. see get_cheese.js
 */

const get_cheese = require('../scraper/get_cheese.js')

var writeStream =  fileSystem.createWriteStream('my.csv');

csv.
    write([

    ["a1","b1"],
    ["a2", "b2"],
    ["c1","c2"]

], {headers:true})
    .pipe(writeStream)

