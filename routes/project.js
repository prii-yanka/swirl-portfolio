const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const projectRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
projectRoutes.route("/").get(function (req, res) {
  let db_connect = dbo.getDb("portfolio");
  db_connect
    .collection("projects")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });
 
// This section will help you get a list of all the records.
projectRoutes.route("/featured").get(function (req, res) {
 let db_connect = dbo.getDb("portfolio");
 db_connect
   .collection("projects")
   .find({tags: "Featured"})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// This section will help you get a list of all the records.
projectRoutes.route("/web").get(function (req, res) {
  let db_connect = dbo.getDb("portfolio");
  db_connect
    .collection("projects")
    .find({tags: "Web App"})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

 // This section will help you get a list of all the records.
projectRoutes.route("/design").get(function (req, res) {
  let db_connect = dbo.getDb("portfolio");
  db_connect
    .collection("projects")
    .find({tags: "Design"})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

 // This section will help you get a list of all the records.
projectRoutes.route("/mobile").get(function (req, res) {
  let db_connect = dbo.getDb("portfolio");
  db_connect
    .collection("projects")
    .find({tags: "Mobile App"})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });
 
// // This section will help you get a single record by id
// projectRoutes.route("/projects/:id").get(function (req, res) {
//  let db_connect = dbo.getDb();
//  let myquery = { _id: ObjectId(req.params.id) };
//  db_connect
//    .collection("projects")
//    .findOne(myquery, function (err, result) {
//      if (err) throw err;
//      res.json(result);
//    });
// });
 
// // This section will help you create a new record.
// recordRoutes.route("/record/add").post(function (req, response) {
//  let db_connect = dbo.getDb();
//  let myobj = {
//    name: req.body.name,
//    position: req.body.position,
//    level: req.body.level,
//  };
//  db_connect.collection("records").insertOne(myobj, function (err, res) {
//    if (err) throw err;
//    response.json(res);
//  });
// });
 
// // This section will help you update a record by id.
// recordRoutes.route("/update/:id").post(function (req, response) {
//  let db_connect = dbo.getDb();
//  let myquery = { _id: ObjectId(req.params.id) };
//  let newvalues = {
//    $set: {
//      name: req.body.name,
//      position: req.body.position,
//      level: req.body.level,
//    },
//  };
//  db_connect
//    .collection("records")
//    .updateOne(myquery, newvalues, function (err, res) {
//      if (err) throw err;
//      console.log("1 document updated");
//      response.json(res);
//    });
// });
 
// // This section will help you delete a record
// recordRoutes.route("/:id").delete((req, response) => {
//  let db_connect = dbo.getDb();
//  let myquery = { _id: ObjectId(req.params.id) };
//  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
//    if (err) throw err;
//    console.log("1 document deleted");
//    response.json(obj);
//  });
// });
 
module.exports = projectRoutes;