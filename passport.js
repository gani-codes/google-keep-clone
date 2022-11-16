const Users = require('./models/Users');
const passport = require('passport');
const checkOrCreateUser = require('./routes/users');
const { verifyPassword } = require('./bcryptConfig');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/api/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        checkOrCreateUser(profile, done);
    }
));

passport.use(new LocalStrategy(
    function (email, password, done) {
        Users.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!verifyPassword(password, user.password)) { return done(null, false); }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});