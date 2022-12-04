const express = require('express')
const connectToDb = require('./db');
require('dotenv').config();
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const app = express()
const port = process.env.PORT || 8000

//making the server to use sessions
app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(express.json());
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//CORS enablement
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: "GET,POST,PUT,DELETE,HEAD,DELETE",
        credentials: true,
    })
);

// routes
app.use('/api/notes', require("./routes/notes"));
app.use('/api/auth', require("./routes/auth"));

app.listen(port, () => {
    connectToDb();
    console.log(`Backend running on port ${port}`)
})