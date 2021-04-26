//step 13b. 
const { gql } = require('apollo-server');

//step 13a. move into their own folder/file. change const to module.exports 
module.exports = gql`
    # step 12e
    type Post{
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }
    #step 16c. required means user doesn't need to input them but code is required to return them
    type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    #step 16b
    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query{
        #step 12d
        getPosts: [Post]
    }
    #step 16 authenticate users. arguments are inputs from user
    #the register with arguments registerInput of type RegisterInput return the value of User as both are then defined above
    type Mutation{
        register(registerInput: RegisterInput): User!
        # step 20c
        login(username: String!, password: String!): User!
    }
` 