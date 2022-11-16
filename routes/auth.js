const router = require('express').Router();
const passport = require('passport');
const { toHashPassword, verifyPassword } = require('../bcryptConfig');
require("../passport")
const Users = require('../models/Users');


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

router.post("/login", async (req, res) => {

    try {
        const user = await Users.findOne({ email: req.body.email });
        if (!user) { res.status(404).json({ success: false, message: "User not found" }) };

        if (!verifyPassword(req.body.password, user.password)) { return res.status(400).json({ success: false, message: "wrong credentials" }) }
        const { password, ...otherDetails } = user._doc;
        return res.status(201).json({ success: true, message: "logged in successfully", user: otherDetails });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
})

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "Login failed",
    });
});

router.get("/login/success", async (req, res) => {

    try {
        if (req.user) {
            res.status(200).json({
                success: true,
                message: "login successfull",
                user: req.user,
                //   cookies: req.cookies
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// router.post("/login", passport.authenticate('local', {
//     successRedirect: process.env.CLIENT_URL,
//     failureRedirect: 'http://localhost:8000/api/auth/login/failed'
// }),
//     (req, res) => {
//         res.redirect(process.env.CLIENT_URL);
//     }
// );

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
    passport.authenticate("google", {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "http://localhost:8000/api/auth/login/failed",
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