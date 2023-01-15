const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const app = express();
console.log(process.env);

const Project = require("./models/project");

app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use(require("./routes/project"));
// get driver connection
// const dbo = require("./db/conn");


// app.get('/', (req,res) => {
//   res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
// });
const port = process.env.PORT || 5001;
app.listen(port, () => {
  // perform a database connection when server starts
  // dbo.connectToServer(function (err) {
  //   if (err) console.error(err);
 
  // });
  console.log(`Server is running on port: ${port}`);
});

// module.exports = app;