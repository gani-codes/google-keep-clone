const mongoose = require("mongoose");
const { Schema } = mongoose;

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
    user: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Notes", noteSchema)