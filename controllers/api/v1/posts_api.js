const Post = require('../../../models/post')

module.exports.index = async function(req, res){

    let newPost = await Post.find({})
        .sort('-createdAt')
        .populate('user', '-password')  // Exclude the user password
        .populate({
            path : 'comments',
            populate : {
                path : 'user'
            }
    });

    return res.json(200, {
        message : "Lists of Posts",
        posts : newPost
    });
}

module.exports.destroy = async function (req, res){
    try{
        //.trim() to remove spaces between them
        const newPost= await Post.findById(req.params.id.trim());

        if(newPost.user == req.user.id){
            await Post.findByIdAndDelete(newPost._id)

            //also deleting the comments of the post
            await Comment.deleteMany({post : newPost._id});

            //req.flash('error', 'Post Deleted');
            return res.json(200, {
                message : 'Post and its comments deleted successfully'
            });
        }else{
            return res.json(401, {
                message: 'You cannot Delete this Post'
            })
        }

    }catch(err){
        console.log("*****",err);
        return res.json(500, {
            message : 'Internal Server Error'
        });
    }
}