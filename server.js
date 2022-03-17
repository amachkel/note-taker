const express = require("express");
// to import modular router for /notes
const notes = require("./routes/notes");
const { readFromFile, readAndAppend } = require("./helpers/fsUtils");
const app = express();
// what is path?
const path = require("path");
// package to create random id
const { v4: uuidv4 } = require("uuid");
uuidv4();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
// access to all client side files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// /api is url alias?
app.use("/api", notes);

// specify path, then a callback function, or route handler
app.get("/notes", (req, res) => {
  // what is _dirname?
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/notes/:id", (req, res) => {
  readFromFile("./db/db.json").then((data) => {
    const notes = JSON.parse(data);
    console.log(notes)
    const note = notes.find((c) => c.feedback_id === req.params.id);
    console.log(note);
    if (note !== undefined) return res.json(note);
  });
});
// GET wildcard route, also for homepage
// why not specify '/' for index.html, then have a separate
//app.get wildcard route?
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
