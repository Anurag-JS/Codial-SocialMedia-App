
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
        title : 'Sign up'
    });
};


module.exports.create = function(res, req){

}

module.exports.createSession = function(res, req){

}