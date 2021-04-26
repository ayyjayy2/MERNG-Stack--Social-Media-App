//step 11a
const {model, Schema } = require('mongoose');

//create schema
const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String
});

//export schema
module.exports = model('User', userSchema);