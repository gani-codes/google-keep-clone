const router = require('express').Router();
const Notes = require("../models/Notes");

//create a note
router.post('/', async (req, res) => {
    try {
        const newNote = new Notes(req.body);
        const note = await newNote.save();
        res.status(200).json({ success: true, message: "New note has been added", note: note })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

//update
router.put("/:id", async (req, res) => {
    try {
        const note = await Notes.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json({ success: true, message: "Note has been updated", note: note });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

// Delete
router.delete("/:id", async (req, res) => {
    try {
        await Notes.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Note deleted successfully" })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
})

// Get a particular note
router.get("/:id", async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);

        if (!note) { res.status(404).json({ success: false, message: "Post does not exists" }); }

        res.status(200).json({ success: true, note: note });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
})

// get all notes
router.get("/", async (req, res) => {
    const uid = req.user.id || req.user._id;
    // console.log(req.user);

    try {
        const notes = await Notes.find({ userId: uid });

        res.status(200).json({ success: true, notes: notes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
})


module.exports = router