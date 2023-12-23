const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const env = require('./environment');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : env.jwt_secret
}

passport.use(new JWTStrategy( opts, async function(jwtPayload, done){
    // Find user and establish the identity
    try {
        const newUser = await User.findById(jwtPayload._id);
      
        if (newUser) {
          return done(null, newUser);
        }else{
            return done(null, false);
        }
        
    }catch (err) {
             console.log('Error in finding user from jwt', err);
             req.flash('error', err);
             return done(err);
    }      
}));

module.exports = passport;