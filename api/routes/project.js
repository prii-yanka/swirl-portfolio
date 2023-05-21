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
    console.log(request);
    response.json(projects);
  });
});

// projectRouter.get("/::selected/::id", async (request, response) => {
//   console.log(request.params.id);
//   let project_name_from_id = "";
//   let signed_url_array = [];
//   await Project.findOne(
//     { _id: ObjectId(request.params.id) },
//     { project_name: 1 }
//   ).then((project) => {
//     project_name_from_id = project.project_name;
//     console.log(project_name_from_id);
//   });

//   var folder_params = {
//     Bucket: process.env.S3_BUCKET_NAME /* required */,
//     // Delimiter: '/',
//     // Key: project_name_from_id,
//     Prefix: project_name_from_id /* Can be your folder name */,
//     // Prefix: `${request.params.selected}/${project_name_from_id}`,  // Can be your folder name
//     // Expires: 900
//   };

//   s3.listObjectsV2(folder_params, function (err, data) {
//     if (err) {
//       console.log(`Error getting prefix/folder ${err}`);
//     } // an error occurred
//     else {
//       console.log("data: " + data); // successful response
//       data.Contents.map((key) => {
//         var file_params = {
//           Bucket: process.env.S3_BUCKET_NAME /* required */,
//           Key: key.Key,
//           Expires: 900,
//         };
//         s3.getSignedUrl("getObject", file_params, function (err, signed_url) {
//           if (err) {
//             console.log(`Error getting image ${err}`);
//           } // an error occurred
//           else {
//             console.log(`the signed url is: ${signed_url}`);
//             if (signed_url.includes("png")) {
//               // only add if link has an image
//               signed_url_array = [...signed_url];
//             }
//           }
//         });
//       });
//     }
//   });
//   response.json(signed_url_array);
//   // signed_url_array.shift();
// });
projectRouter.get("/::selected", async (request, response) => {
  let selected = request.params.selected.charAt(0).toUpperCase() + request.params.selected.slice(1);
  Project.find({ tags: `${selected}` }).then((projects) => {
    response.json(projects);
  });
});

projectRouter.get("/::selected/::id", async (request, response) => {
  console.log(request.params.id);
  let project_name_from_id = "";
  let signed_url_array = [];
  let project_by_id = await Project.findOneAndUpdate(
    { _id: ObjectId(request.params.id) },
    { images: signed_url_array}
  ).then((project) => {
    var folder_params = {
      Bucket: process.env.S3_BUCKET_NAME, /* required */
      Prefix: project.project_name, /* Can be your folder name */
    };
  
    s3.listObjectsV2(folder_params, function (err, data) {
      if (err) {
        console.log(`Error getting prefix/folder ${err}`);
      } // an error occurred
      else {
        console.log("data: " + data); // successful response
        data.Contents.map((key) => {
          var file_params = {
            Bucket: process.env.S3_BUCKET_NAME /* required */,
            Key: key.Key,
            Expires: 900,
          };
          s3.getSignedUrl("getObject", file_params, function (err, signed_url) {
            if (err) {
              console.log(`Error getting image ${err}`);
            } // an error occurred
            else {
              console.log(`the signed url is: ${signed_url}`);
              if (signed_url.includes("png")) {
                // only add if link has an image
                signed_url_array = [...signed_url.toString()];
                console.log(signed_url_array);
                response.json(signed_url_array);
              }
            }
          });
        });
      }
    });
  });
  // response.json(project_by_id);
});

module.exports = projectRouter;
