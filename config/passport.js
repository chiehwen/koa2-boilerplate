const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            console.log(jwt_payload);
            const user = await User.findById(jwt_payload.id);
            console.log(user);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    )
};