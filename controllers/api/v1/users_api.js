const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment');

module.exports.createSession = async function(req, res){
    try{
        let newUser = await User.findOne({email : req.body.email});
       // console.log(newUser);

        if(!newUser || newUser.password != req.body.password){
            console.log(newUser.password)
            return res.json(422, {
                message : 'Invalid Username or Password'
            });
        }
        return res.json(200, {
            message : 'Login Successful! Keep your Token safe',
            data : {
                token : jwt.sign({ user: newUser }, env.jwt_secret, {expiresIn : '100000'})
            }
        })
    }catch(err){
        console.log("*****",err);
        return res.json(500, {
            message : 'Internal Server Error'
        });
    }
}