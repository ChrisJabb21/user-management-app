//imports
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//Initialize
const app = express();

//Sequelize
const db = require("./models");
const Role = db.role;
db.sequelize.sync();

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });
  Role.create({
    id: 2,
    name: "admin",
  });
}

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

//Parse requests for content type/MIME : application/json  application/x-www-form-urlencoded
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Node server is up and running." });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

//set port and listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
