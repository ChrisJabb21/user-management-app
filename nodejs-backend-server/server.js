//imports
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//Initialize
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
//Parse requests for content type/MIME : application/json  application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Sequelize
const db = require("./models");
db.sequelize.sync();

//code to force drop and resync //will not work unless FK constraints removed
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
//   initial();
// });


app.get("/", (req, res) => {
  res.json({ message: "Node server is up and running." });

});
require("./routes/admin.routes")(app);
require("./routes/auth.routes")(app);
//require("./routes/user.routes")(app);


//set port and listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// code to autogenerate and populate Roles table
// function initial() {
//   Role.create({
//     id: 1,
//     name: "user",
//   });
//   Role.create({
//     id: 2,
//     name: "admin",
//   });
// }