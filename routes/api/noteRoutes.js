const router = require("express").Router();
const { notes } = require('../../db/db.json');
const { createNewNote, deleteNote, readFromFile } = require('../../lib/notefunc');


router.get('/notes', (req, res) => {
  readFromFile('/db/db.json').then((data) => res.json(JSON.parse(data)))
  let saved = notes;
  res.json(saved);
})

router.post('/notes', (req, res) => {
  req.body.id = notes.length.toString();
  let note = createNewNote(req.body, notes);
  res.json(note);
})

router.delete('/notes/:id', (req, res) => {
  deleteNote(notes, req.params.id);
  res.json(notes);
})



module.exports = router;