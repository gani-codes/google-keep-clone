const express = require('express')
const connectToDb = require('./db');
require('dotenv').config();
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const app = express()
const port = 8000

app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.use('/api/notes', require("./routes/notes"));
app.use('/api/auth', require("./routes/auth"));

app.listen(port, () => {
    connectToDb();
    console.log(`Backend running on http://localhost:${port}`)
})