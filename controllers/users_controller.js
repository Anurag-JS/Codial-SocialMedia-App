const User = require('../models/user');

module.exports.profile = function (req, res){
    return res.render('user_profile', {
        title : 'haka'
    })
};

// Rendering the sign in page
module.exports.signin = function (req, res){
    return res.render('user_signin', {
        title : 'Sign in'
    });
};

// Rendering the sign in page
module.exports.login = function (req, res){
    return res.render('user_login', {
        title : 'Login'
    });
};



   

    

module.exports.create = async (req, res) => {

    try {
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }
        const existingUser = await User.findOne({ email: req.body.email });

        if (!existingUser) {
            const newUser = await User.create(req.body);
            return res.redirect('/users/log-in');
        } else {
            return res.redirect('back');
        }
    } catch (error) {
        console.log('Error in SignUp:', error);
        return;
    }
};



  
//     user.findOne({email: req.body.email}, function(err, user){
//         if(err){
//             console.log('Error in finding user on SignUp');
//             return ;
//         }
//         if(!user){
//             user.create(req.body, function(err, user){
//                 if(err){
//                     console.log('Error in Creating user on SignUp');
//                     return;
//                 }
//                 return res.redirect('/users/log-in')
//             });
//         }else{
//             return res.redirect('back');
//         }
//     });



//module.exports.createSession = function(res, req){
    //
//}