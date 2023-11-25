const User = require('../models/user');

module.exports.profile = async function (req, res){
    try{
        let newUser = await User.findById(req.params.id.trim());
        return res.render('user_profile', {
        title : 'User Profile',
        profile_user : newUser
        });
    } catch(err){
        console.log('Error in finding User profile',err);
    }
};

module.exports.update = async function(req, res){
    try{
        if(req.user.id == req.params.id){
            await  User.findByIdAndUpdate(req.params.id, req.body);
            return res.redirect('back');
        }else{
            return res.status(401).send('Unauthorized')
        }
    }catch(err){
        console.log('Error in updating user',err);
    }
}

// Rendering the sign in page
module.exports.signin = function (req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_signin', {
        title : 'Sign in'
    });
};

// Rendering the sign in page
module.exports.login = function (req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
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



module.exports.createSession = function(req, res){
    req.flash('success', "Logged in Successfully");
    return res.redirect('/');
}


module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if (err) {
            console.log('Error during logout:', err);
        }
        req.flash('success', "Logged Out Successfully");
        return res.redirect('/');
    });
   
};
