const rp = require('request-promise');
const cheerio = require('cheerio');

const { Writable } = require('stream')
var fs = require('fs')
var request = require('request')

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')
const url = 'mongodb://127.0.0.1:27017/Cheese'


/**
 * This is the scraper that gpes to <unknown cheese place> and get all the information
 * about every cheese. Then it inserts into a mongodb database runnbing locally.
 * 
 * The scraper uses a stream/socket to write to the db so it only consumes ~120 MB while running
 * 
 * The trade off of such low consumptions is speed. 
 * 
 * Last run : 432.79s
 * 
 * The scraper stops when it notices any repeates in the data.
 * 
 */

const downloadImage = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);
  
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};


MongoClient.connect(url, {useNewUrlParser: true}, function(err, client){
    assert.equal(null, err)
    console.log("DB Connected!")

    var db = client.db('Cheese');
    const testCollection = db.collection('info')

    const wStream = new Writable({
        //Do db operation here 
        write(chunk, encoding, callback){
            var cheeses = JSON.parse(chunk.toString())

            //add them all to thnigs already read
            cheeses.forEach(element => cheeseAlreadyRead.push(element.Name));

            testCollection.insert(cheeses, (e, result) => {
                assert.equal(e,null)
                assert.equal(cheeses.length, result.result.n)
                console.log("shouldve inserted data")
            })

            callback()
        }
    })

    const START_URI = `<unknown cheese place>`
    var cheeseAlreadyRead = []
    var done = "done"

    const get_cheese = function(_uri){
        if(_uri === done)return;

        const options = {
            uri : _uri,
            transform : (body) => cheerio.load(body) //just tell request promise to give it to cheerio before us
        }

        rp(options)
        .then(($) => {
            var cheeseNames = []

            var parseLink = (str) => {//expected format : '<a href="/smoked-gouda/">Smoked Gouda</a>' 
                var first = str.indexOf('/') + 1
                return START_URI.concat(str.substring(first, str.indexOf('/',first)+1))
            }

            var getImage = (str) => { //expected format: ​​​​​<img src="/media/img/cheese-thumbs/Midnight_Moon_Gouda.jpg" alt="Gouda" title="Gouda">​​​​​
                var start = str.indexOf("src") + 5
                var str2 = str.substring(start)
        
                //The larger version of the image is at .../img/cheese/<name>.jpg
                var imgLink = str2.substring(0, str2.indexOf('"')).replace("-thumbs",'')
                var numname = imgLink.lastIndexOf('/')
        
                var location = imgLink.substring(numname, numname.length)

                downloadImage(
                    //START_URI + str2.substring(0, str2.indexOf('"')).replace("-thumbs",''),  
                    START_URI + imgLink,
                    './images/'+location,
                    () => {console.log("got : " + str2)}
                );
                //returns the name of the image to be saved with the cheese data.
                return location;
            }

            //var iter=0 //debug

            $('.row').find('.cheese-item').each( function(i, entity){
                //if(iter === 2)return; //debug. only 2 items per page

                cheeseNames.push({
                    Name: $(this).find('a').html(),
                    Link: parseLink($(this).find('h3').html()), //papa bless
                    Img : getImage($(this).find('.cheese-image-border').children().html())
                })

               // iter++ //debug
            })
        return cheeseNames
        }).then((cheeses) => {

            var finalCheeses = cheeses.map(cheese => {
                options.uri = cheese.Link

                return rp(options).
                    then(($) => {

                    var cheeseInfo = {}
                    cheeseInfo['Name'] = cheese.Name
                    cheeseInfo['Link'] = cheese.Link
                    cheeseInfo['Img']  = cheese.Img

                    $('.summary-points').find('p').each( function(i, entity){
                        var strs =  $(this).text()
                        var spl  = strs.split(":")

                        if(strs == spl) {
                            spl = strs.split(" from ")
                        }
                        
                        //mongoose doesn't like spaces
                        cheeseInfo[spl[0].split(' ').join('_')] = spl[1]
                    })

                    return cheeseInfo
                }).catch((e) => {
                    console.log(e)
                })
            })

            return Promise.all(finalCheeses)

        }).then((allCheese) => {
            //console.log(allCheese)
        
            //Check the cheese that have been read already
            //There was a mistake on page 43 so I chekc first and last now
            if(cheeseAlreadyRead.includes(allCheese[0].Name) && cheeseAlreadyRead.includes(allCheese[allCheese.length-1].Name) ){
                console.log("REPEAT DATA!!!")
                get_cheese(done) //signal for repeating data
                client.close()
            }else{

                wStream.write(JSON.stringify(allCheese))
                //Recursive call to the next page
                if(_uri === START_URI){ 
                    _uri = _uri + '?per_page=20&page=1#top' //This link and the START_URI return the same page
                }

                var nextPage = _uri
                var loc = nextPage.indexOf("#")
                var loc2 = nextPage.indexOf("&")
                
                var eq = nextPage.indexOf('=',loc2)
                
                const NEW_URI = nextPage.substring(0,eq+1) + (parseInt(nextPage.substring(nextPage.indexOf('=',loc2)+1,loc+1))+1) + nextPage.substring(loc)
                console.log(NEW_URI) // make the recursive call here
                get_cheese(NEW_URI)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    get_cheese(START_URI)
});
