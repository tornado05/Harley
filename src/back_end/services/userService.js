var passport    = require('passport'),
    session = require('express-session'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose');

module.exports = (function () {
    var db = mongoose.connection;

    var Schema = mongoose.Schema;

    var users = new Schema({
        username: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    });

    var User = mongoose.model('User', users);

    mongoose.connect('mongodb://localhost:27017/Users');
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('data base opend');
    });

    /**
     * Mongoose method for password validation
     */
    // User.methods.validPassword = function( pwd ) {
    //     // EXAMPLE CODE!
    //     return ( this.password === pwd );
    // };

    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({ username: username }, function (err, user) {
                if (err) {
                    console.log(err);
                    return done(err); }
                if (!user) {
                    console.log('!user', user);
                    return done(null, false, { message: 'Incorrect username.' });
                }
                // if (!user.validPassword(password)) {
                //     console.log('!password', user.validPassword(password));
                //     return done(null, false, { message: 'Incorrect password.' });
                // }
                if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
                return done(null, user);
            });
        }
    ));

    var login = function (req, res, next) {
        passport.authenticate('local',
            function(err, user, info) {
            console.log(info);
                return err
                    ? next(err)
                    : user
                    ? req.logIn(user, function(err) {
                    return err
                        ? next(err)
                        : res.redirect('/users');
                })
                    : res.redirect('/');
            }
        )(req, res, next);
    };

    var register = function(req, res, next) {
        var user = new User({ username: req.body.username, password: req.body.password});
        user.save(function(err) {
            return err
                ? next(err)
                : req.logIn(user, function(err) {
                return err
                    ? next(err)
                    : res.redirect('/users');
            });
        });
    };

    var logout = function(req, res) {
        req.logout();
        res.redirect('/');
    };


    return {
        login: login,
        register: register,
        logout: logout
    };
}());