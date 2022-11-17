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

passport.use(new LocalStrategy({ usernameField: 'email' },
    (email, password, done) => {
        Users.findOne({ email: email }, async (err, user) => {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            const isPasswordCorrect = await verifyPassword(password, user.password);
            if (!isPasswordCorrect) { return done(null, false, { message: 'Incorrect username or password.' }); }
            // console.log(isPasswordCorrect)
            // console.log(user)
            return done(null, user, { message: isPasswordCorrect });
        });
    }
));

passport.serializeUser(function (user, done) {
    process.nextTick(function () {
        done(null, user);
    })
});

passport.deserializeUser(function (user, done) {
    // done(null, user);
    process.nextTick(function () {
        done(null, user);
    })
});