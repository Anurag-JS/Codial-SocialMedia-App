const Like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');



module.exports.toggleLike = async function (req, res){
    //likes/toggle/?id=abcdef&type=Post
    try{
        let likeable;
        let deleted = false;

        if(req.query.type == "Post"){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // Checking if a like already exists
         let existingLike = await Like.findOne({
            likeable : req.query.id,
            onModel : req.query.type,
            user: req.user._id
         });

         if(existingLike){    // if like already exists then delete it 
            likeable.likes.pull(existingLike._id);
            
            existingLike.remove();
            deleted = true;
         }else{   // else make a new like
            let newLike = await Like.create({
                user: req.user._id,
                onModel : req.query.type,
                likeable : req.query.id
            });

            likeable.likes.push(newLike._id);
            likeable.save();
         }

         return res.json(200, {
            message : 'Request Successful',
            data : {
                deleted : deleted
            }
        });

    }catch(err){
        console.log("Error in Likes",err);
        return res.json(500, {
            message : 'Internal server error'
        });
    }
}