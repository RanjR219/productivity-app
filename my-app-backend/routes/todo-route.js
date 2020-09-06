const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = express.Router();

const todoSchema = new mongoose.Schema({
  itemName: String,
});

const Todo = mongoose.model("Todo", todoSchema);

router.get("/todos", function (req, res) {
  Todo.find(function (err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);

      // mongoose.connection.close(); //closing connection once we are done
    }
  });
});

router.post("/todos", function (req, res) {
  const todo = new Todo({
    itemName: req.body.itemName,
  });

  todo.save();
});

router.put("/todos/:id", function (req, res) {
  console.log(req.params.id);
  Todo.findByIdAndUpdate(
    { _id: req.params.id },
    { itemName: req.body.itemName }
  ).then(() => {
    console.log("Update");
  });
  //   // founditemIndex = req.body.id;
  //   // Todo.find(function (err, foundItems) {
  //   //   console.log(foundItems[founditemIndex]._id);
  //   //   Todo.findByIdAndUpdate(
  //   //     { _id: foundItems[founditemIndex]._id },
  //   //     { itemName: req.body.itemName }
  //   //   ).then(() => {
  //   //     console.log("Updated");
  //   //   });
  //   // });
});

router.delete("/todos", function (req, res) {
  Todo.deleteOne({ itemName: req.body.itemName }).then(() => {
    console.log("Deleted");
  });
});

router.delete("/deleteAll", function (req, res) {
  Todo.deleteMany({}).then(() => {
    console.log("deleted all");
  });
});

module.exports = router;
