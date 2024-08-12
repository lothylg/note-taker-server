const fs = require("fs");
const path = require("path");
const db = require('../db/db.json')


function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({
            notes: notesArray
        }, null, 2)
    )

    return note;
}

function deleteNote(notesArray, id) {
    let deleteID = parseInt(id);
    notesArray.splice(deleteID, 1);

    // This loop re-writes the indexes for the remaining notes.
    for (let i = deleteID; i < notesArray.length; i++) {
        notesArray[i].id = i.toString();
    }

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({
            notes: notesArray
        }, null, 2)
    )
}


function readFromFile() {
    const data = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8');
    const notes = JSON.parse(data).notes;
    return notes;
}

module.exports = {
    createNewNote,
    deleteNote,
    readFromFile
};