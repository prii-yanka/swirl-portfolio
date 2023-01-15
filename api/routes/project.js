const express = require("express");

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

// function getFileStream(fileKey) {
//   const downloadParams = {
//   Key: fileKey,
//   Bucket: process.env.S3_BUCKET_NAME,
// };
// return s3.getObject(downloadParams).createReadStream();
// }

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const projectRouter = express.Router();

// This will help us connect to the database
// const dbo = require("../db/conn");
const Project = require("../models/project");
// const { request, response } = require("express");
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


projectRouter.get("/", async (request, response) => {
  Project.find({}).then((projects) => {
    response.json(projects);
  });
});

projectRouter.get("/image", async (request, response) => {
  var params = { Bucket: process.env.S3_BUCKET_NAME, Key: "Add Recipe.png" };
  s3.getObject(params, function (err, data) {
    response.writeHead(200, { "Content-Type": "image/png" });
    // response.write(data.Body);
    // response.end();
    response.write(data.Body, "binary");
    response.end(null, "binary");
  });
});

projectRouter.get("/featured", async (request, response) => {
  Project.find({ tags: "Featured" }).then((projects) => {
    response.json(projects);
  });
});

projectRouter.get("/web", async (request, response) => {
  Project.find({ tags: "Web App" }).then((projects) => {
    response.json(projects);
  });
});

projectRouter.get("/design", async (request, response) => {
  Project.find({ tags: "Design" }).then((projects) => {
    response.json(projects);
  });
});

projectRouter.get("/mobile", async (request, response) => {
  Project.find({ tags: "Mobile App" }).then((projects) => {
    response.json(projects);
  });
});

// projectRoutes.route("/").get(function (req, res) {
//   let db_connect = dbo.getDb("portfolio");
//   db_connect
//     .collection("projects")
//     .find({})
//     .toArray(function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
//  });

// // This section will help you get a list of all the records.
// projectRoutes.route("/featured").get(function (req, res) {
//  let db_connect = dbo.getDb("portfolio");
//  db_connect
//    .collection("projects")
//    .find({tags: "Featured"})
//    .toArray(function (err, result) {
//      if (err) throw err;
//      res.json(result);
//    });
// });

// // This section will help you get a list of all the records.
// projectRoutes.route("/web").get(function (req, res) {
//   let db_connect = dbo.getDb("portfolio");
//   db_connect
//     .collection("projects")
//     .find({tags: "Web App"})
//     .toArray(function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
//  });

//  // This section will help you get a list of all the records.
// projectRoutes.route("/design").get(function (req, res) {
//   let db_connect = dbo.getDb("portfolio");
//   db_connect
//     .collection("projects")
//     .find({tags: "Design"})
//     .toArray(function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
//  });

//  // This section will help you get a list of all the records.
// projectRoutes.route("/mobile").get(function (req, res) {
//   let db_connect = dbo.getDb("portfolio");
//   db_connect
//     .collection("projects")
//     .find({tags: "Mobile App"})
//     .toArray(function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
//  });

module.exports = projectRouter;
