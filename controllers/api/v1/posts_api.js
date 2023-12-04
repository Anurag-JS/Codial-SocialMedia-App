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