// Initialize dependencies
const bodyParser = require('body-parser'); //Parse json data
const express = require('express'); // Node's framework
const mongoose = require('mongoose'); // Object data modeling library designed to work in an asynchronous environment. Used to create a connection to a Mongo database
const cors = require('cors'); // (middleware) Cross-Origin Resource Sharing - mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served. E.g. an Angular frontend served on port 4200 requesting resources from a backend app served on port 3000

const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const config = require('./config/config.json');
// Create app
const app = express();

// Add middleware
app.use(bodyParser.json());
app.use(cors());
app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true
    })
)

// Connect to db
mongoose.connect(
    `mongodb+srv://${config.user}:${config.password}@mean-graphql.ujswl.mongodb.net/${config.dbname}?retryWrites=true&w=majority`, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    }
).then(() => {
    app.listen(3000, console.log('Connected to port 3000'))
}).catch((err) => console.log(err))