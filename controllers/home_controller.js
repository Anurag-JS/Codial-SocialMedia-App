const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res){
    try {
         // Populate the user and comments' user fields
        let newPost = await Post.find({})
        .sort('-createdAt')
        .populate('user', '-password')  // Exclude the user password
        .populate({
            path : 'comments',
            populate : {
                path : 'user'
            },
            populate : {
                path : 'likes'
            }
        })
        .populate('comments')
        .populate('likes');

        
        if(newPost){
            let newUser = await User.find({});
            return res.render('home', {
                title : "Codial HomePage",
                posts : newPost,
                all_users : newUser
            });
        }
        
    }catch (err) {
        console.log("Error in Finding posts",err)
    }
}



