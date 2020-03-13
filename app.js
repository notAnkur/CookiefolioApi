const express = require('express');
const db = require('./web/db/index.js');

const app = express();

const port = 8006;
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const indexRoute = require("./web/routes/index.route");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/web/views"));

// initialize db
db.connect()
  .then(() => console.log("Connected to db"));

app.use(cors());

app.use("/", indexRoute);


app.listen(port, () => {
  console.log("Server is running on port:", port);
});