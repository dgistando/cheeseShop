//This is an exmple of the cheerio web scraper that
//gives good examples of how it works in order to use it on the cheese site

const rp = require('request-promise');
const cheerio = require('cheerio');

const options = {
    uri:"https://whentowork.com/",
    transform : (body) => cheerio.load(body) //just tell request promise to give it to cheerio before us
}


//class : .
//id : #
//tag : <tag>[class=<className>]


var nextPage = '?per_page=20&page=99#top'
var loc = nextPage.indexOf("#")
var loc2 = nextPage.indexOf("&")

var eq = nextPage.indexOf('=',loc2)

const NEW_URI = nextPage.substring(0,eq+1) + (parseInt(nextPage.substring(nextPage.indexOf('=',loc2)+1,loc+1))+1) + nextPage.substring(loc)
console.log(NEW_URI) // make the recursive call here

rp(options)
  .then(($) => {
    //console.log($)
    console.log( $('#description').find('.text-center').text() )

    //console.log(
        var iter=0; 
        var locations = []
        $('#industries').find('.list-group-item-heading').each(function(i, entity){
            if(iter==3)return;
            locations[i] = $(this).text()
            iter++
        })
            
            /*(i, elem) => {
            locations[i] = $(this).text()
            //locations[i] = $(this).find('.list-group-item').find('.list-group-item-heading').text()
        }) */
        console.log(locations)
    //console.log( $('.text-center').html())
}).catch((err) => {
    console.log(err)
})
