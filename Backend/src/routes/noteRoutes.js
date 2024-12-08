const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");

// Route to add a note
router.post("/addNote", noteController.addNote);

// Route to get all notes
router.get("/getAllNotes", noteController.getAllNotes);

// Route to get a single note by ID
router.get("/note/:id", noteController.getNoteById);

// Route to update a note by ID
router.patch("/updateNote/:id", noteController.updateNote);

// Route to delete a note by ID
router.delete("/deleteNote/:id", noteController.deleteNote);

module.exports = router;
