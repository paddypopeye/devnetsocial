var JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
//require('../models/User');
const User = mongoose.model('User')
const keys = require('../config/keys');

const opts = [];
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
        .then(user => {
            if(user){
                return done(null,user);
            }//end if 
            return done(null,false);
        })//end then()
        .catch(err => console.log(err));
    }))//end use()
}// end export


