const express = require('express')
const connectToDb = require('./db');
require('dotenv').config();
const cors = require('cors')
const app = express()
const port = 8000

app.use(express.json())

app.use(cors())

app.use('/api/notes', require("./routes/notes"));

app.listen(port, () => {
    connectToDb();
    console.log(`Backend running on http://localhost:${port}`)
})