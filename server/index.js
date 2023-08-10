const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
//dotenv allows to use .env file.
require("dotenv/config");

const app = express();

const PORT = process.env.PORT || 2000;

app.use("/QuestionImages", express.static("QuestionImages"));
app.use("/ProfileImages", express.static("ProfileImages"));

//middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

//connect to database
mongoose.connect(process.env.DB_CONNECTION, (err) => {
  if (err) {
    console.log("no connection");
  } else {
    console.log("Connected");
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
