const express = require("express");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const projectRouter = express.Router();

// This will help us connect to the database
const Project = require("../models/project");
// const { Promise } = require("mongodb");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// projectRouter.get("/", async (request, response) => {
//   Project.find({}).then((projects) => {
//     console.log(request);
//     response.json(projects);
//   });
// });

const getProjectPosterImage = async (project) => {
  return new Promise((resolve, reject) => {
    let my_signed_url = "";

    const file_params = {
      Bucket: process.env.S3_BUCKET_NAME /* required */,
      Key: `${project.project_name}/Poster.png`,
      Expires: 900,
    };

    s3.getSignedUrl("getObject", file_params, function (err, signed_url) {
      if (err) {
        console.log(`Error getting image ${err}`);
      } // an error occurred
      else {
        // console.log(`the signed Poster url is: ${signed_url}`);
        if (signed_url.includes("png")) {
          // only add if link has an image
          my_signed_url = `${signed_url}`;
          // console.log(my_signed_url);
          resolve(signed_url);
        }
      }
      // return signed_url;
    });
  });
};

projectRouter.get("/::selected", async (request, response) => {
  let selected =
    request.params.selected.charAt(0).toUpperCase() +
    request.params.selected.slice(1);

  try {
    const projects = await Project.find(selected === "All" ? {} : { tags: selected });

    await Promise.all(
      projects.map(async (project) => {
        const poster_link = await getProjectPosterImage(project);
        // console.log(`poster_link: ${poster_link}`);
        await Project.findOneAndUpdate(
          { _id: ObjectId(project._id) },
          { poster_image: poster_link }
        );
      })
    );

    const updated_projects = await Project.find(selected === "All" ? {} : { tags: selected });
    response.json(updated_projects);
  } catch (error) {
    response.status(500).json({ error: "Internal Server Error" });
  }
});

const getImagesByProject = async (project) => {
  let signed_url_array = [];

  const folder_params = {
    Bucket: process.env.S3_BUCKET_NAME /* required */,
    Prefix: project.project_name /* Can be your folder name */,
  };

  await s3
    .listObjectsV2(folder_params, function (err, data) {
      if (err) {
        console.log(`Error getting prefix/folder ${err}`);
        // return Error(`Error getting prefix/folder ${err}`);
      } // an error occurred
      else {
        // console.log("data: " + JSON.stringify(data.Contents)); // successful response
        data.Contents.map((key) => {
          const file_params = {
            Bucket: process.env.S3_BUCKET_NAME /* required */,
            Key: key.Key,
            Expires: 900,
          };
          s3.getSignedUrl("getObject", file_params, function (err, signed_url) {
            if (err) {
              console.log(`Error getting image ${err}`);
            } // an error occurred
            else {
              // console.log(`the signed url is: ${signed_url}`);
              if (signed_url.includes("png")) {
                // only add if link has an image
                // key_count++;
                signed_url_array = [...signed_url_array, `${signed_url}`];
                // console.log(signed_url_array);
                // response.json(signed_url_array);
              }
            }
          });
        });
        // console.log(`signed_url_array: ${signed_url_array}`);
      }
    })
    .promise();
  return signed_url_array;
};

projectRouter.get("/::selected/::id", async (request, response) => {
  console.log(request.params.id);
  const project_id = request.params.id;
  // console.log("project_id: " + project_id);
  const project = await Project.findOne({ _id: ObjectId(project_id) });
  // console.log("project_name: " + project.project_name);
  const imageLinks = await getImagesByProject(project);

  // .then((imageLinks, err) => {
  // console.log(`imageLinks: ${imageLinks}`);
  const updated_project = await Project.findOneAndUpdate(
    { _id: ObjectId(project_id) },
    { images: imageLinks },
    { new: true}
  );
  // console.log(`updated_project: ${updated_project}\n\n`);
  response.json(updated_project);
});

module.exports = projectRouter;
