const Comment = require('../models/comment');
const Post = require('../models/post')

module.exports.create = async function (req, res){
    try{
        // req.body.post means the name="post" in comments form in home.ejs
        let newPost = await Post.findById(req.body.post);
        if(newPost){
            try{
                const newComment = await Comment.create({
                    content : req.body.content,
                    post : req.body.post,
                    user : req.user._id
                });
                // updating and storing comments in posts
                //pushing the newComment into the comments array of the newPost that was retrieved with Post.findById(req.body.post).
                newPost.comments.push(newComment);
                await newPost.save();

                res.redirect('/');

            } catch(error){
                console.log('Error in Creating comments',error)
            }
        }
    } catch(err){
        console.log('Error in finding Post', err)
    }
}