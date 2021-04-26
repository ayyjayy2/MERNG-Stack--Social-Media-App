//14.c combine all resolvers
const postsResolvers = require('./posts');
const usersResolvers = require('./users');

//14c. combine
module.exports = {
    Query: {
        ...postsResolvers.Query  // used while we only have one query rn
    },
    //step 16d
    Mutation: {
        ...usersResolvers.Mutation
    }
}
