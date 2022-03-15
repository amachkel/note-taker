const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');
// GET /api/notes should read the db.json file and return all saved notes as JSON.

// GET Route for retrieving all notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
  
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

// POST Route for adding notes
notes.post('/', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add note`);
  
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        feedback_id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.json('Error in posting feedback');
    }
  });
module.exports = notes;