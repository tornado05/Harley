var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./config.json');
var User = require('../models/userModel');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use('local-login', new LocalStrategy(
        function(username, password, done) {
            // console.log("local strategy");
            // console.log(username, password);
            User.findOne({
                username: username.toLowerCase()
            }, function(err, user) {
                if (err)
                    return done(err);
                if (!user)
                    return done(null, false);
                if (!user.validPassword(password))
                    return done(null, false);
                return done(null, user);
            });
        }
    ));

    passport.use(new FacebookStrategy({
            clientID        : config.auth.facebook.clientID,
            clientSecret    : config.auth.facebook.clientSecret,
            callbackURL     : config.auth.facebook.callbackURL
        },
        function(token, refreshToken, profile, done) {
            // asynchronous
            process.nextTick(function() {
                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser = new User();
                        newUser.facebook.id    = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name  = profile.displayName;
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });
            });
        }
    ));
};
