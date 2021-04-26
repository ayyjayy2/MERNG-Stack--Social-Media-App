//step 14c
const Post = require('../../models/Post');

//step 14b.
module.exports = {
    Query: {
        //step 12f.
        async getPosts(){
            try{
                const posts = await Post.find(); //await is used bc it's an async function. .find() is used if not a specific condition
                return posts; //return all posts
            } catch(err){
                throw new Error(err);
            }
        }
    }
}