const rp = require('request-promise')
const cheerio = require('cheerio')

var fs = require('fs')
var request = require('request')

const options = {
    uri : 'unknown Cheese source',
    transform : (body) => cheerio.load(body)
}

/**
 * 
 * This is just a practice file for downloading images while
 * getting the cheese information. I added these parts to get_cheese.js
 * 
 */

console.log("before downloading")

const download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

console.log("before image insert")

download('https://www.google.com/images/srpr/logo3w.png', './images/google.png', function(){
  console.log('done');
});


console.log("after image inserted")
/*
rp(options)
 .then(($) => {
    var iter = 0

    $('.row').find('.cheese-item').each( function(i, entity){
        if(iter === 2)return;

        //String format: ​​​​​<img src="/media/img/cheese-thumbs/Midnight_Moon_Gouda.jpg" alt="Gouda" title="Gouda">​​​​​
        var str = $(this).find('.cheese-image-border').children().html()
        var start = str.indexOf("src") + 5
        var str2 = str.substring(start)

        var imgLink = str2.substring(0, str2.indexOf('"')).replace("-thumbs",'')
        var numname = imgLink.lastIndexOf('/')

        download(
            //options.uri + str2.substring(0, str2.indexOf('"')).replace("-thumbs",''),  
            options.uri + imgLink,
            './images/'+imgLink.substring(numname, numname.length),
            () => {console.log("got : " + str2)}
        );

        iter++
    })

}).catch(e => {
    console.log(e)
})*/