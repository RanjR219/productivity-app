const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const notesRoutes = require("./routes/notes-route");
const todoRoutes = require("./routes/todo-route");

const app = express();
app.use(cors({ origin: "*" }));
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json()); // This will parse any incoming request body and extract any json data which is in ther. convert it to javascript datastructure. then it calls next automatically and runs the next middleware in app.js and adds this json data there
app.use(notesRoutes);
app.use(todoRoutes);

mongoose.connect("mongodb://localhost:27017/dashboardDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
app.listen(5000, function (req, res) {
  console.log("Server is up and running!!!");
});
