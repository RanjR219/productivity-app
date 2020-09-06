const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = express.Router();

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model("Note", noteSchema);

// const DUMMY_VARIABLE = [
//   {
//     notes: [
//       { title: "abcs", content: "agsfhagsdhg" },
//       { title: "day2", content: "today is a good day" },
//     ],
//   },
// ];

router.get("/notes", function (req, res) {
  // res.json(DUMMY_VARIABLE[0]);
  Note.find(function (err, notes) {
    if (err) {
      console.log(err);
    } else {
      res.json(notes);
      // console.log(notes);
      // mongoose.connection.close(); //closing connection once we are done
    }
  });
});

router.post("/notes", function (req, res) {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
  });

  note.save();
  // const createdNotes = {
  //   title,
  //   content,
  // };
  // console.log(createdNotes);
  // DUMMY_VARIABLE.push(createdNotes);
  // console.log(DUMMY_VARIABLE);
});

router.delete("/notes", function (req, res) {
  Note.deleteOne({ title: req.body.title }).then(() => {
    console.log("Deleted");
  });
});

module.exports = router;
