const Comment = require('../models/comment');
const Post = require('../models/post')

// controller for creating a comment
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

//controller for deleting the comment
module.exports.destroy = async function (req, res){
    try{
        const newComment= await Comment.findById(req.params.id.trim());
        if(newComment.user.toString() == req.user.id){
            //storing id of post from comment
            let postId= newComment.post;
            //deleting the comment
            await Comment.findByIdAndDelete(newComment._id);
            //deleting the comment id from post array
            await Post.findByIdAndUpdate(postId,{ $pull :{comments : req.params.id}});

            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log("Error in deleting Comment",err);
    }
}