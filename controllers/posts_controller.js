const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    try{
        await Post.create({
            content : req.body.content,
            user : req.user._id
        })
        return res.redirect('back');
    } catch(err){
        console.log("Error in creating Posts",err);
    }  
}

module.exports.destroy = async function (req, res){
    try{
        const newPost= await Post.findById(req.params.id);
        // .id means converting the object id into strings in req.user.id below.
        if(newPost.user == req.user.id){
            // inbuilt function to remove post
            newPost.remove();

            //also deleting the comments of the post
            try{
                await Comment.deleteMany({post : req.params.id});
            }catch(err){
                return res.redirect('back');
            }
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log("Error in deleting Post",err);
    }
}