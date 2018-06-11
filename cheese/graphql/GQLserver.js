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
            id : {
                type: graphql.GraphQLID 
            },
            name : {
                type: graphql.GraphQLString
            },
            Made : {
                type: graphql.GraphQLString
            },
            link : {
                type: graphql.GraphQLString
            },
            origin : {
                type: graphql.GraphQLString
            }
        }
    }
});

var queryType = new graphql.GraphQLObjectType({
    name:'Query',
    fields : () => ({
       getCheese: {
           type: new GraphQLList(CheeseType),
           resolve : () => {
               return new Promise((resolve, reject) => {
                   Info.find((err, cheese) => {
                       err ? reject(err) : resolve(cheese)
                   })
               })
           }
       },

       otherOne : {
            type: new GraphQLList(CheeseType),
            resolve : (obj, args, context) => {
                return new Promise((resolve, reject) => {
                    Info.find((err, cheese) => {
                        err ? reject(err) : resolve(cheese)
                    })
                })
            }
       }
    })
});

var schema = new GraphQLSchema({
    query : queryType
})

class Cheese{
    constructor(Cheeses){
        this.name = Cheeses.name
        this.Made = Cheeses.Made
        this.link = Cheeses.link
        this.origin = Cheeses.origin
    }
}

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

/*var schema = buildSchema(`
        type qType {
            num : Int
            name : String
            getName : String
            setName(newName : String) : String
        }

        type Query{
            message: String,
            something(id : Int!): qType
        }
`);

class qType{
    constructor(numberPassed){
        this.num = numberPassed
        this.name = `this is my name ${numberPassed}`
    }

    getName(){
        return this.name
    }

    setName(nameNum){
       this.name = `this is my new name ${nameNum}`
       return this.name
    }
}

var root = {
    message : () => 'Sup Worlds!!',
    //something  : ({id}) => Array.apply(null, {length: id}).map(Number.call, Number)
    something  : ({id}) => new qType(id)
};


var app = express();
app.use('/graphql', express_graphql({
    schema : schema,
    rootValue : root,
    graphiql : true
}));
app.listen(4000, () => console.log('listening...'));*/

var app = express();
app.use('/graphql', graphQLHTTP({
    schema, 
    pretty : true,
    graphiql: true, }));
app.listen(4000, (err) => console.log('listening...'));
