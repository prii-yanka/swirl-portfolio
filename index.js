const express = require("express");
const path = require('path');
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5001;
app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use(require("./routes/project"));
// get driver connection
const dbo = require("./db/conn");

// app.get('/', (req,res) => {
//   res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
// });
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});