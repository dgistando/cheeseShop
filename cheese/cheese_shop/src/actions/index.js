import fetch from 'isomorphic-fetch';

const ROOT_URL = 'http://localhost:4000/graphql?'

export const SEARCH_CHEESE = 'SEARCH_CHEESE'
export const SELECT_CHEESE = 'SELECT_CHEESE'

export function searchCheese(cheese){

    console.log(cheese)

    var SearchQuery = `{
        Search(search : \"${cheese}\"){
            Name
            Type
        }
    }`

    const request = fetch(ROOT_URL ,{
        method:'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({"query" : SearchQuery})
    })

    //The data is there, but burried deep in a promise
    //request.then(Response => Response.json().then(json => console.log(JSON.stringify(json))))

    return {
        type : SEARCH_CHEESE,
        payload : request.then(Response => Response.json()) //list of cheeses
    };
}

export function selectCheese(cheeseItem){
    return {
        type : SELECT_CHEESE,
        payload : cheeseItem
    };
}