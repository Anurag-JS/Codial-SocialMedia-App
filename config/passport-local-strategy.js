const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// Authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
   },
   async function(req, email, password, done){
    // Find user and establish the identity
    try {
        const user = await User.findOne({ email: email });
      
        if (!user || user.password !== password) {
          req.flash('error', 'Invalid Username/Password');
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
             console.log('Error in finding user(passport)', err);
             req.flash('error', err);
             return done(err);
        }      
   }
));

//Serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//Deserializing the user from the key in the cookies
passport.deserializeUser(async function(id,done){
    try {
        const user = await User.findById(id);
      
        if (!user) {
          console.log('Error in deserializing user(passport): User not found');
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        console.log('Error in deserializing user(passport)', err);
        return done(err);
      } 
});


// Checking user's authentication
passport.checkAuthentication = function(req,res,next){
    // built-in function req.isAuthenticated to authenticate req
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/log-in');
}

passport.setAuthenticatedUser  = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from session cookie & we are sending this to locals for views
        res.locals.user =req.user;
    }
    return next();
}

module.exports = passport;