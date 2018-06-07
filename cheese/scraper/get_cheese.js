const rp = require('request-promise');
const cheerio = require('cheerio');

const { Writable } = require('stream')

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')
const url = 'mongodb://127.0.0.1:27017/testCheese'


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
            cheeses.forEach(element => cheeseAlreadyRead.push(element.name));

            testCollection.insert(cheeses, (e, result) => {
                assert.equal(e,null)
                assert.equal(cheeses.length, result.result.n)
                console.log("shouldve inserted data")
            })

            callback()
        }
    })

    const START_URI = "<unknown cheese place>"
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

            //var iter=0 //debug

            $('.row').find('.cheese-item').each( function(i, entity){
                //if(iter === 2)return; //debug. only 2 items per page

                cheeseNames.push({
                        name: $(this).find('a').html(),
                        link: parseLink($(this).find('h3').html()) //papa bless
                })

               // iter++ //debug
            })
        return cheeseNames
        }).then((cheeses) => {

            var finalCheeses = cheeses.map(cheese => {
                options.uri = cheese.link

                return rp(options).
                    then(($) => {

                    var cheeseInfo = {}
                    cheeseInfo['name'] = cheese.name
                    cheeseInfo['link'] = cheese.link

                    $('.summary-points').find('p').each( function(i, entity){
                        var strs =  $(this).text()
                        var spl  = strs.split(":")

                        if(strs == spl) {
                            spl = strs.split(" from ")
                        }

                        cheeseInfo[spl[0]] = spl[1]
                    })

                    return cheeseInfo
                }).catch((e) => {
                    console.log(e)
                })
            })

            return Promise.all(finalCheeses)

        }).then((allCheese) => {
            //console.log(allCheese)
        
            if(cheeseAlreadyRead.includes(allCheese[0].name)){
                get_cheese(done) //signal for repeating data
                client.close()
            }else{

                !wStream.write(JSON.stringify(allCheese))
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
