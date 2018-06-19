var express = require('express');
var express_graphql = require('express-graphql')
var graphql = require('graphql')
var graphQLHTTP = require('express-graphql') 


const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList
} = require('graphql/type')

//Import info from '../graphql/schema' 
const Info = require('../graphql/schema')

function getProjection(fieldASTs){
    return fieldASTs.fieldNodes[0].selectionSet.selection.reduce((projections, selection) => {
        projections[selection.name.value] = true
        return projections
    }, {})
}

var CheeseType = new graphql.GraphQLObjectType({
    name : 'cheese',
    fields : function(){
        return {
            Name : {
                type : graphql.GraphQLString
            },
            Link : {
                type : graphql.GraphQLString
            },
            Img : {
                type : graphql.GraphQLString
            },
            Made : {
                type : graphql.GraphQLString
            },
            Country_of_origin : {
                type : graphql.GraphQLString
            },
            Family : {
                type : graphql.GraphQLString
            },
            Type : {
                type : graphql.GraphQLString
            },
            Fat_content : {
                type : graphql.GraphQLString
            },
            Calcium_content : {
                type : graphql.GraphQLString
            },
            Texture : {
                type : graphql.GraphQLString
            },
            Rind : {
                type : graphql.GraphQLString
            },
            Colour : {
                type : graphql.GraphQLString
            },
            Flavour : {
                type : graphql.GraphQLString
            },
            Aroma : {
                type : graphql.GraphQLString
            },
            Vegetarian : {
                type : graphql.GraphQLString
            },
            Producers : {
                type : graphql.GraphQLString
            },
            Synonyms : {
                type : graphql.GraphQLString
            },
            Alternative_spelling : {
                type : graphql.GraphQLString
            },
            Fat_dry : {
                type : graphql.GraphQLString
            }
        }
    }
});

var queryType = new graphql.GraphQLObjectType({
    name:'Query',
    fields : () => ({
        //This query just gets all the cheeses
        getAllCheese: {
            type: new GraphQLList(CheeseType),
            resolve : () => {
                return new Promise((resolve, reject) => {
                    Info.find((err, cheese) => {
                        err ? reject(err) : resolve(cheese)
                    })
                })
            }
        },

        //searches by name any matching string
        Search : {
            type: new GraphQLList(CheeseType),
            args: {
                search : {type : graphql.GraphQLString}
            },
            resolve : (_, {search}) => {
                return new Promise((resolve, reject) => {

                    Info.find({name : new RegExp(search)}, (err, cheese) => {
                        err ? reject(err) : resolve(cheese)
                    })
                })
            }
        },

        //searches name, but only first letter. upper or lower
        letterSearch : {
            //Make sure there is a check before this for
            // length of the string == 1
            type: new GraphQLList(CheeseType),
            args: {
                letter : {type : graphql.GraphQLInt}
            },
            resolve : (_, {letter}) => {
                return new Promise((resolve, reject) => {

                    var letters = String.fromCharCode(letter).toLowerCase() + String.fromCharCode(letter).toUpperCase()

                    Info.find({name : new RegExp(`^[${letters}].*`)}, (err, cheese) => {
                        err ? reject(err) : resolve(cheese)
                    })
                })
            }
        },

        //Search by feel / type
        // data looks like this; Type : " soft, artisan, <other descriptive word>" 
        TypeSearch : {
            //try to get comma separated list
            //maybe check boxes to convert to list
            type: new GraphQLList(CheeseType),
            args: {
                desc : {type : graphql.GraphQLString}
            },
            resolve : (_, {desc}) => {
                return new Promise((resolve, reject) => {
                    desc = desc.replace(' ','');
                    var descriptions = desc.split(',')
                        
                    console.log(descriptions)
                    
                    Info.find({Type : {$in : descriptions.map(x => {
                        return new RegExp(x)
                   })}}, (err, cheese) => {
                        err ? reject(err) : resolve(cheese)
                    })
                })
            }
        },
        //Planning to use another unique ID that defines similarity in cheeses
    })
});

var schema = new GraphQLSchema({
    query : queryType
})

var root = { //get the cheese from mongoose here
    getCheese : ({name}) => {
        //console.log(Info.find({name : name}).schema)
        return Info.find({name : name})//says cant read field gouda because return String
    }
    
    /*
    getCheese : ({name}) => {
        var projections = getProjection(fieldASTs);
        var foundItems = new Promise((resolve, reject) => {
            Info.find(name, projections,(err, todos) => {
                err ? reject(err) : resolve(todos)
            })
        })

        console.log(foundItems)
        return foundItems
    }*/
}

var app = express();
app.use('/graphql', graphQLHTTP({
    schema, 
    pretty : true,
    graphiql: true, }));
app.listen(4000, (err) => console.log('listening...'));
