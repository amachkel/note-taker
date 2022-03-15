const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
uuidv4();
// enivornment variable: PORT, 
// global object: process, 
// obj property 'env': environment variable
const PORT = process.env.PORT || 3001;
// to import modular router for /notes
const notesRouter = require('./api/notes');


// middleware
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use('/api/notes', notesRouter);
// specify path, then a callback function, or route handler
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// GET route for homepage
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// GET /api/notes should read the db.json file and return all saved notes as JSON.

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
