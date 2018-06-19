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