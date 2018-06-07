var fileSystem = require('fs')
var csv  = require('fast-csv')

const get_cheese = require('../scraper/get_cheese.js')
var cheese = new get_cheese();



var writeStream =  fileSystem.createWriteStream('my.csv');



csv.
    write([

    ["a1","b1"],
    ["a2", "b2"],
    ["c1","c2"]

], {headers:true})
    .pipe(writeStream)

