const { toHashPassword } = require("../bcryptConfig");
const Users = require("../models/Users");

//create the user incase it is not present when using Google OAuth2
const checkOrCreateUser = (profile, done) => {
    Users.findOne({ email: profile._json.email }, async (err, user) => {
        if (user) { return done(null, profile) }
        else {
            const hashedPassword = await toHashPassword(profile.id);
            const newUser = new Users({
                firstName: profile._json.name,
                lastName: profile._json.given_name,
                email: profile._json.email,
                password: hashedPassword,
                picture: profile._json.picture,
            });
            await newUser.save();
        }

        return done(err, profile);
    });

}

module.exports = checkOrCreateUser

