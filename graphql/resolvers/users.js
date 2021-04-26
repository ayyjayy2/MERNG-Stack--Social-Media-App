//step 16e
const User = require('../../models/User');
//step 17c 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//step 18
const { UserInputError } = require('apollo-server');
//step 19 + 20
const { validateRegisterInput, validateLoginInput } = require('../../util/validators')
//step 17f
const { SECRET_KEY } = require('../../config');

//step 20e
function generateToken(user){
    return jwt.sign({
        //passing data that we have to token 
        id: res.id,
        username: res.username,
        email: res.email
    }, SECRET_KEY, { expiresIn: '1h'}) //17g. getting secret from config (second param) then options like expiring in 1h (1 hour)
}

module.exorts = {
    Mutation: {
        //step 20d
        async login(_, { username, password }){
            const { errors, valid } = validateLoginInput(username, password);

            //step 20h
            if(!valid){
                throw new UserInputError('Errors', { errors });
            }

            //step 20d . get user from database
            const user = await User.findOne({ username }); //aka username must be equal to username

            //below is 20d
            if(!user){
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }

            //make sure password matches the user
            const match = await bcrypt.compare(password, user.password);
            if(!match){
                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong credentials', { errors });
            }

            //step 20g. if password is correct
            const token = generateToken(user);
            //step 20g 
            return {
                ...user._doc,
                id: user._id,
                token
            };
        },

        /*implementing resolver for register. arguments originally were:
                register(parent, args, context, info)
           parent: gives result of what was the input from last step but currently no step before this so replace with _
           args: argumenst from typeDefs.js register Mutation
           context: explain later
           info: general info about metadata that we almost never need
        */
        //17c. bcrypt hashing is asynchronous so add async keyword/function before register
        async register(_, { 
            //17b. destructure args to get user from data. gives access to each separately
            registerInput: { username, email, password, confirmPassword }
        }){ 

        //step 19
        // TO DO : validate user data
        const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
        if(!valid){
            throw new UserInputError('Errors', { errors });
        }

        //step 18
        // TO DO : make sure user doesn't already exist
        const user = await User.findOne({ username });
        if(user){
            throw new UserInputError('Username is taken', {
                //this is the payload
                errors: {
                    username: 'This username is'
                }
            })
        }

        /*step 17
         TO DO : hash password before storing in database and create auth token
            17b. destructure args
         */
        //17d. 
        password = await bcrypt.hash(password, 12); //at least 12 characters
        const newUser = new User({
            username,
            email,
            password,
            createdAt: new Date().toISOString() //isoString converts to string
        });

        const res = await newUser.save(); //save to database

        // 17e. create token for user before able to save data to user 
        //step 20e. turn this into a function at the top of the file
        // const token = jwt.sign({
        //     //passing data that we have to token 
        //     id: res.id,
        //     username: res.username,
        //     email: res.email
        // }, SECRET_KEY, { expiresIn: '1h'}) //17g. getting secret from config (second param) then options like expiring in 1h (1 hour)

        //step 20f. 
        const token = generateToken(res);

        //17h
        return {
            //spread data of user (... represents spread)
            ...res._doc, //where document is stored 
            id: res._id,
            token
        }
        }
    }
}