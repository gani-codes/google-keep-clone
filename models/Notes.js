const mongoose = require("mongoose");
const { Schema } = mongoose;

//notes schema 
const noteSchema = new Schema({
    title: {
        type: String,
    },
    desc: {
        type: String,
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    isTrash: {
        type: Boolean,
        default: false
    },
    userId: { //stores the owner of the notes so that it remains protected
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Notes", noteSchema)