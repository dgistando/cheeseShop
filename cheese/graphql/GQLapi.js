//This took way too much time to write. I think ill
//just sticking with the string version

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString
} = require('graphql/type')

const cheeseType = new GraphQLObjectType({
    name : 'cheese',
    description : 'all the cheeses',
    fields : {
        id : {
            type: new GraphQLNonNull(GraphQLInt)
        },
        name : {
            type: GraphQLString
        },
        link : {
            type: GraphQLString
         },
        Made: {
            type: GraphQLString
        },
        origin:{
            type: GraphQLString
        }
    }
})

module.exports = new GraphQLSchema({
    query : new GraphQLObjectType({
        name : 'RootQueryType',
    })
})
