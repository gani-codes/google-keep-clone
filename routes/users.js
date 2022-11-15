const Users = require("../models/Users");

const checkOrCreateUser = (profile, done) => {
    Users.findOne({ email: profile._json.email }, async (err, user) => {
        if (user) { return done(null, profile) }
        else {
            const newUser = new Users({
                firstName: profile._json.name,
                lastName: profile._json.given_name,
                email: profile._json.email,
                password: profile.id
            });
            await newUser.save();
            // console.log(savedUser)
        }
        // return cb(err, user);
        return done(err, profile);
    });
    // console.log(accessToken)
    // console.log(profile);
    // return done(null, profile);
}

module.exports = checkOrCreateUser

