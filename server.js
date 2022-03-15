const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.static('public'))

// specify path, then a callback function, or route handler
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// GET route for homepage
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
