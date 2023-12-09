const route = require('express').Router();
const noteCtrl = require('../controllers/note.controller')
const bodyParser = require('body-parser')
const encoder = bodyParser.urlencoded({extended: false})

route.get('/fetchAllNotes',encoder, noteCtrl.getAllNotes);
route.get('/notes/:type', encoder, noteCtrl.filterNote)
route.get('/fetchNote/:id',encoder, noteCtrl.getNote);
route.post('/createNote', encoder, noteCtrl.createNote);
route.put('/updateNote', encoder, noteCtrl.updateNote);
route.delete('/deleteNote', encoder, noteCtrl.deleteNote);

module.exports = route