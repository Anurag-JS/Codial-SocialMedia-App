const Post = require('../models/post')

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
            return res.render('home', {
                title : "Codial HomePage",
                posts : newPost
            });
        }
        
    }catch (err) {
        console.log("Error in Finding posts",err)
    }
}



