const { toHashPassword } = require("../bcryptConfig");
const Users = require("../models/Users");

const checkOrCreateUser = (profile, done) => {
    Users.findOne({ email: profile._json.email }, async (err, user) => {
        if (user) { return done(null, profile) }
        else {
            const hp = await toHashPassword(profile.id);
            const newUser = new Users({
                firstName: profile._json.name,
                lastName: profile._json.given_name,
                email: profile._json.email,
                password: hp,
                picture: profile._json.picture,
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

