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

// router.get('/', (req, res) =>
//   readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)))
// );

// // POST Route for submitting note
// router.post('/', (req, res) => {
//   // Destructuring assignment for the items in req.body
//   const { title, text } = req.body;

//   // If all the required properties are present
//   if (title && text) {
//     // Variable for the object we will save
//     const newNote = {
//       title,
//       text,
//       note_id: uuidv4(),
//     };

//     readAndAppend(newNote, './db/db.json');

//     const response = {
//       status: 'success',
//       body: newNote,
//     };

//     res.json(response);
//   } else {
//     res.json('Error in posting note');
//   }
// });


module.exports = router;