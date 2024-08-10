import express from 'express';
import Note from '../models/Note.js'; // Ensure the file extension is included

const router = express.Router();

// GET all notes
router.get('/allnotes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new note
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({
    title,
    content,
  });

  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a note
router.delete('/allnotes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Note.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
