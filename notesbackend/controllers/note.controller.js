const Note = require('../models/note');


exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json({notes: notes});
      } 
      catch (error) {
        res.status(500).json({ error: error.message });
      }
  };

exports.getNote = async (req, res) => {
    const { id } = req.params;
    try {
      const singleNote = await Note.findById({ _id: id });
      if (!singleNote) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.status(200).json({ singleNote: singleNote });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.createNote = async (req, res) => {
    try {
      const { title, content } = req.body;
      const newNote = new Note({ title, content });
      const savedNote = await newNote.save();
      res.status(200).json({savedNote:savedNote});
    } 
    catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.updateNote = async (req, res) => {
    try {
      const { id, title, content } = req.body.noteToUpdate;
        const updatedNote = await Note.findOneAndUpdate(
          { _id: id },
          {  title, content  }
        );
        if (!updatedNote) {
          return res.status(404).json({ error: 'Note not found' });
        }
        res.status(200).json({ updatedNote: updatedNote });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  };

exports.deleteNote = async (req, res) => {
    try {
        const { id } = req.body;
        const deletedNote = await Note.findOneAndDelete({ _id: id });
        if (!deletedNote) {
          return res.status(404).json({ error: 'Note not found' });
        }
        res.status(200).json({ deletedNote: deletedNote });
        } 
        catch (error) {
            res.status(500).json({ error: error.message });
    }
  };

exports.filterNote = async(req,res) => {
    const { type } = req.params;
    try {
      const filteredNotes = await Note.find({ type });
      res.status(200).json({ filteredNotes: filteredNotes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}