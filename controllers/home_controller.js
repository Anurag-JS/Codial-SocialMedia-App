const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res){
    try {
        // populate the user
        let newPost = await Post.find({})
        .populate('user')
        .populate({
            path : 'comments',
            populate : {
                path : 'user'
            }
        })
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



