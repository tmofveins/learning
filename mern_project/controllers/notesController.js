const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");

// @desc get all notes
// @route GET /notes
// @access private
const getAllNotes = asyncHandler(async(req, res) => {
    // -password removes the password field
    // lean returns js object instead of mongoose document
    // more lightweight return option, but you can't use mongoose features on it
    const notes = await Note.find().lean();

    if (!notes?.length) {
        // 400 = bad request
        return res.status(400).json({ message: "No notes found" });
    }

    res.json(notes);
});

// @desc create new note
// @route POST /notes
// @access private
const createNewNote = asyncHandler(async(req, res) => {
    const { userId, title, text } = req.body;

    // confirming data exists
    if (!userId || !title || !text ) {
        return res.status(400).json({ message: "All fields are required to create a note" });
    }

    // check for duplicate username
    // exec ensures the statement is executed as a Promise (hence the await)
    const duplicate = await Note.findOne({ title }).lean().exec();
    if (duplicate) {
        // 409 = conflict
        return res.status(409).json({ message: "Duplicate note title" });
    }

    const note = await Note.create({ userId, title, text });

    if (note) {
        // 201 = created, usually sent after POST/PUT requests
        res.status(201).json({ message: `New note ${title} created` });
    } else {
        res.status(400).json({ message: "Invalid note data received" });
    }
});

// @desc update a user
// @route PATCH /users
// @access private
const updateNote = asyncHandler(async(req, res) => {
    const { id, user, title, text, completed } = req.body;

    if (!id || !user || !title || !text || typeof completed !== "boolean") {
        return res.status(400).json({ message: "All fields are required" });
    }

    // we need to save changes, so obtain user as mongoose document
    const note = await Note.findById(id).exec();

    if (!note) {
        return res.status(400).json({ message: "Note not found" });
    }

    // check for potential duplicate
    const duplicate = await Note.findOne({ title }).lean().exec();
    // only an actual duplicate if the id is the same
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: "Duplicate note title" });
    }

    note.user = user;
    note.title = title;
    note.text = text;
    note.completed = completed;

    const updatedNote = await note.save();
    res.json({ message: `Update note ${updatedNote.title}` });
});

// @desc delete a user
// @route DELETE /users
// @access private
const deleteNote = asyncHandler(async(req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Note ID required" });
    }

    const note = await Note.findById(id).exec();
    if (!note) {
        return res.status(400).json({ message: "Note not found" });
    }

    const result = await note.deleteOne();
    const reply = `Note ${result.title} with ID ${result._id} deleted`;
    res.json(reply);
});

module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote,
};