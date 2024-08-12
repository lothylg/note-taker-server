const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const db = require('./db/db.json')

//Allows all notes to have a unique ID
const { v4: uuidv4 } = require('uuid');

//Allows public folder to be unblocked
app.use(express.static('public'))
app.use(express.json())

//API Routes
// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        ///error logging
        if (err) throw err;
        let dbData = JSON.parse(data);
        //Returns new database
        res.json(dbData)
    });   
})

//POST 
///api/notes receives a new note to save on the request body and add it to db.json, then returns new note to the client.

app.post('/api/notes', (req, res) => {
    // Grabs notes from the body of the request
    const newNote = req.body;

    // Gives each note a random ID
    newNote.id = uuidv4();

    // Reads the existing notes from the db.json file
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data);

        // Adds the new note to the existing notes array
        notes.push(newNote);

        // Update the db.json file with the new notes array
        fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) => {
            if (err) throw err;
            console.log('Note added successfully!');
            res.json(newNote);
        });
    });
});


//DELETE
// notes when the button is clicked by removing the note from db.json, saving and showing the updated database on the front end.


app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;

    // Read the existing notes from the db.json file
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data);

        // Filter out the note with the specified ID
        const updatedNotes = notes.filter((note) => note.id !== noteId);

        // Update the db.json file with the modified notes array
        fs.writeFile('./db/db.json', JSON.stringify(updatedNotes, null, 2), (err) => {
            if (err) throw err;
            console.log('Note deleted successfully!');
            res.json(updatedNotes);
        });
    });
});

//HTML Routes
//Home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//Notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

//Wildcard Route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//App listens with front end on this port
app.listen(PORT, () =>
    console.log(`Now listening on http://localhost:${PORT}`))