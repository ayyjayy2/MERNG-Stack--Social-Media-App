//step 23
const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config'); //get secret we have

module.exports = (context) => {
    //context = { ... headers }
    const authHeader = context.req.headers.authorization;
    //check for header
    if(authHeader){
        //get token from it: Bearer ....
        const token = authHeader.split('Bearer ')[1]; //split returns an array of couple strings so we need index 1 (and yes intentional space after bearer)
        if(token){
            try{
                const user = jwt.verify(token, SECRET_KEY);
                return user;
            }catch(err){
                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        //if if statements fail
        throw new Error('Authentication token must be \'Bearer [token]')
    }
    //if if statements fail
    throw new Error('Authorization header must be provided')
}