//step 14c
const Post = require('../../models/Post');
//23b
const checkAuth = require('../../util/check-auth');

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
        },
        //step 21c.
        async getPost(_, { postId }){
            try{
                const post = await Post.findById(postId);
                if(post){
                    return post; //if post exists
                }else{
                    throw new Error('Post not found');
                }
            }catch(err){
                throw new Error(err);
            }
        }
    },
     //step 21
    Mutation: {
       async createPost(_, { body }, context){
        //23c. if user exists then continue to create post 
        const user = checkAuth(context);
        
        const newPost = new Post({
            bobdy,
            user: user.id,
            username: user.username,
            createdAt: new Date().toISOString()
        });
        const post = await newPost.save();
        
        return post;
       }
    }
}