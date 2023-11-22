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
        //.trim() to remove spaces between them
        const newPost= await Post.findById(req.params.id.trim());
        // .id means converting the object id into strings in req.user.id below.
        if(newPost.user.toString()== req.user.id){
            // inbuilt function to remove post
            //await newPost.remove();
            await Post.findByIdAndDelete(newPost._id)

            //also deleting the comments of the post
            
            await Comment.deleteMany({post : newPost._id});
            return res.redirect('back');
           
        }else{
           // console.log(newPost.user,req.user.id)
            return res.redirect('back');
        }
    }catch(err){
        console.log("Error in deleting Post",err);
    }
}