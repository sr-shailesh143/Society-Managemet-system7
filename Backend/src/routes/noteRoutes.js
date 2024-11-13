const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");

// Route to add a note
router.post("/create/note", noteController.addNote);

// Route to get all notes
router.get("/get/note", noteController.getAllNotes);

// Route to get a single note by ID
router.get("/note/:id", noteController.getNoteById);

// Route to update a note by ID
router.patch("/update/note/:id", noteController.updateNote);

// Route to delete a note by ID
router.delete("/delete/note/:id", noteController.deleteNote);

module.exports = router;
