const { isRequiredArgument } = require("graphql");
//step 4a connect to db
const mongoose = require('mongoose');
//step 1.
const {ApolloServer } = require('apollo-server');
//step 2a. type definitions which need gql
//step 14d. get rid of gql require 
//const gql = require('graphql-tag'); 

//step 13c. 
const typeDefs = require('./graphql/typeDefs');
//step 12b. import post schema
//step 14d get rid of const post and replace with resolvers.
//const Post = require('./models/Post');
const resolvers = require('./graphql/resolvers')
//step 10b. get connection string from config.js
const { MONGODB } = require('./config.js');



//2b. where graph types and queries are are: ! means it is required and adds type safety
//step 13. move into their own folder/file
// const typeDefs = gql`
//     # step 12e
//     type Post{
//         id: ID!
//         body: String!
//         username: String!
//         createdAt: String!
//     }
//     type Query{
//         # sayHi: String!        step 2b
//         #step 12d
//         getPosts: [Post]
//     }
// ` 

//step 2c
// const resolvers = {
    //14b. cut query and past it in resolvers posts.js file
    // Query: {
    //     //step 2c
    //     // sayHi: () => 'Hello World!!!'
    //     //step 12f.
    //     async getPosts(){
    //         try{
    //             const posts = await Post.find(); //await is used bc it's an async function. .find() is used if not a specific condition
    //             return posts; //return all posts
    //         } catch(err){
    //             throw new Error(err);
    //         }
    //     }
    // }
// };

//3a. set up apollo server instance
const server = new ApolloServer({
    typeDefs,
    resolvers,
    //step 22b. destructure request and forward it in the request body
    context: ( { req }) => ( { req }) 
});

//step 4b. connect to db. get connection string from mongodb.com dashboard
//step 10c. add parameters of connection string variable and .then part
//step 10d. merge the server.listen .then part with this one
//** error 'useNewURLParser is not supported' */
mongoose.connect(MONGODB, { useNewURLParser: true})
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: 5000});
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    });


//3b. run server
//step 10d. this gets merged with the above
//don't have to specify a port in {}
// server.listen({port: 5000})
//     .then(res => {
//         console.log(`Server running at ${res.url}`)
//     })