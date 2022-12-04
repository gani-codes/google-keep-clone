const router = require('express').Router();
const passport = require('passport');
const { toHashPassword } = require('../bcryptConfig');
require("../passport")
const Users = require('../models/Users');

const serverURL = process.env.SERVER_URL;

// registering new user
router.post("/signup", async (req, res) => {
    try {
        const tempUser = await Users.findOne({ email: req.body.email });
        if (tempUser) { return res.status(401).json({ success: false, message: "User with this email id is already registered" }) }

        const hashedPassword = await toHashPassword(req.body.password);

        const newUser = new Users({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
        })

        const savedUser = await newUser.save();

        return res.status(201).json({ success: true, message: "User created successfully", user: savedUser })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
})

// redirect to when login failed
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "Login failed",
    });
});

// redirect to when login succeed
router.get("/login/success", (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const { password, ...otherDetails } = req.user._json || req.user;
            return res.status(201).json({ success: true, message: "logged in successfully", user: otherDetails });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

//it needs to be optimised since it is taking alot of time to login
router.post("/login", passport.authenticate('local', {
    // successRedirect: '/',
    successRedirect: `${serverURL}/api/auth/login/success`,
    failureRedirect: `${serverURL}/api/auth/login/failed`
})
);

// router.post('/login',
//     passport.authenticate('local', { failureRedirect: 'http://localhost:8000/api/auth/login/failed', failureMessage: true }),
//     // function (req, res) {
//     //     res.redirect(process.env.CLIENT_URL);
//     // }
// );

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
    passport.authenticate("google", {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: `${serverURL}/api/auth/login/failed`,
    })
);

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { console.log(err.message) }
        req.session.destroy((e) => {
            if (e) { return res.status(501).json({ success: false, message: "Internal server error" }) }
            res.clearCookie('connect.sid');
            res.redirect(process.env.CLIENT_URL);
        });
    });
});



module.exports = router