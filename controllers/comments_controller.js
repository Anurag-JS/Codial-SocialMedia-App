const Comment = require('../models/comment');
const Post = require('../models/post')

// controller for creating a comment
module.exports.create = async function (req, res){
    try{
        // req.body.post means the name="post" in comments form in home.ejs
        let newPost = await Post.findById(req.body.post);
        if(newPost){
                let newComment = await Comment.create({
                    content : req.body.content,
                    post : req.body.post,
                    user : req.user._id
                });
                // updating and storing comments in posts
                //pushing the newComment into the comments array of the newPost that was retrieved with Post.findById(req.body.post).
                newPost.comments.push(newComment);
                await newPost.save();
                
                if(req.xhr){
                    newComment = await newComment.populate('user', 'name').execPopulate();
                    return res.status(200).json({
                        data : {
                            comment : commentData
                        }
                    });
                }
        
                req.flash('success', 'Comment Posted');
                res.redirect('/');
        }
    } catch(err){
        console.log('Error in finding Post', err)
    }
}

//controller for deleting the comment
module.exports.destroy = async function (req, res){
    try{
        const newComment= await Comment.findById(req.params.id.trim());
        // if(!newComment){
        //     console.log("newComment is empty")
        // }
        if(newComment.user.toString() == req.user.id){
            //storing id of post from comment
            let postId= newComment.post;
            //deleting the comment
            await Comment.findByIdAndDelete(newComment._id);
            //deleting the comment id from post array
            await Post.findByIdAndUpdate(postId,{ $pull :{comments : req.params.id}});

            if(req.xhr){
                return res.status(200).json({
                    data : {
                        comment_id : req.params.id
                    }
                });
            }
            req.flash('error', 'Comment deleted');
            return res.redirect('back');
        }else{
            req.flash('error', 'You Cannot Delete this Comment');
            return res.redirect('back');
        }
    }catch(err){
        console.log("Error in deleting Comment",err);
        return;
    }
}