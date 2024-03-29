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
    const projects = await Project.find(
      selected === "All" ? {} : { tags: selected }
    );

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

    const updated_projects = await Project.find(
      selected === "All" ? {} : { tags: selected }
    );
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
              if (signed_url.includes("png") || signed_url.includes("JPG")) {
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

const getVideoByProject = async (project) => {
  return new Promise((resolve, reject) => {
    let my_signed_url = "";

    const file_params = {
      Bucket: process.env.S3_BUCKET_NAME /* required */,
      Key: `${project.project_name}/Video.mp4`,
      Expires: 900,
    };

    s3.getSignedUrl("getObject", file_params, function (err, signed_url) {
      if (err) {
        console.log(`Error getting image ${err}`);
      } // an error occurred
      else {
        // console.log(`the signed Poster url is: ${signed_url}`);
        if (signed_url.includes("mp4")) {
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

projectRouter.get("/::selected/::id", async (request, response) => {
  console.log(request.params.id);
  const project_id = request.params.id;
  // console.log("project_id: " + project_id);
  const project = await Project.findOne({ _id: ObjectId(project_id) });
  // console.log("project_name: " + project.project_name);
  const imageLinks = await getImagesByProject(project);
  const videoLink = await getVideoByProject(project);

  // .then((imageLinks, err) => {
  // console.log(`videoLink: ${videoLink}`);
  const updated_project = await Project.findOneAndUpdate(
    { _id: ObjectId(project_id) },
    { images: imageLinks, video: videoLink },
    { new: true }
  );
  // console.log(`updated_project: ${updated_project}\n\n`);
  response.json(updated_project);
});

projectRouter.post("/updateDescriptionToDefault", async (request, response) => {
  const projects = await Project.find({});
  await Promise.all(
    projects.map(async (project) => {
      const poster_link = await getProjectPosterImage(project);
      await Project.findOneAndUpdate(
        { _id: ObjectId(project._id) },
        {
          description: {
            aboutTheClient: [
              "Name of client",
              "what they do & their location:",
            ],
            goalAndSituation: [
              "What was the main challenge and measure of success?",
              "Did you have a certain idea or expectation for the project when you began?",
            ],
            processAndWhy: [
              "Anything interesting to share about your process for this project?",
              "surprising insight? Early sketches we can see?",
              "Why did you choose that approach? Ask yourself WHY WHY WHY a thousand times and answer those questions.",
            ],
            theOutcome: [
              "Did you feel proud of the result? Did it exceed your expectations?",
              "tell us why the project is still valuable or meaningful",
            ],
            theTeam: ["Talk about team roles and my role"],
          },
        }
      );
    })
  );
  response.json("projects updated");
});

projectRouter.post("/updateDescription/::projectId", async (request, response) => {
  const projectId = request.params.projectId;
  console.log(`projectId: ${projectId}`);
  const project = await Project.findOne({ _id: ObjectId(projectId) });
  console.log(project.project_name);
  const description = request.body.description
  await Project.findOneAndUpdate(
    { _id: ObjectId(project._id) },
    {
      description: {
        aboutTheClient: description.aboutTheClient,
        goalAndSituation: description.goalAndSituation,
        processAndWhy: description.processAndWhy,
        theOutcome: description.theOutcome,
        theTeam: description.theTeam,
      },
    }
  );
  response.json("projects updated");
});

projectRouter.post("/updateImages/::projectId", async (request, response) => {
  const projectId = request.params.projectId;
  console.log(`projectId: ${projectId}`);
  const project = await Project.findOne({ _id: ObjectId(projectId) });
  console.log(project.project_name);
  let descrptionsArray = [];
  console.log(project.images.length);
  project.images.map((image) => {
    // console.log(image);
    const url = new URL(image);
    let fileName = url.pathname.replace(/^.*[\\\/]/, "");

    const reg = /\.(png)|.(jpg)|.(JPG)|\%\d*/g;
    fileName = fileName.replaceAll(reg, " ");
    descrptionsArray = [...descrptionsArray, fileName];
    console.log(`descarray: ${descrptionsArray}\n`);
  });
  await Project.findOneAndUpdate(
    { _id: ObjectId(project._id) },
    { imageDescriptions: descrptionsArray }
  );
  response.json("projects updated with image descrptions");
});

projectRouter.post("/updateImages", async (request, response) => {
  const projects = await Project.find({});
  await Promise.all(
    projects.map(async (project) => {
      let descrptionsArray = [];
      project.images.map((image) => {
        // console.log(image);
        const url = new URL(image);
        let fileName = url.pathname.replace(/^.*[\\\/]/, "");

        const reg = /\.(png)|.(jpg)|.(JPG)|\%\d*/g;
        fileName = fileName.replaceAll(reg, " ");
        descrptionsArray = [...descrptionsArray, fileName];
        console.log(`descarray: ${descrptionsArray}\n`);
      });
      await Project.findOneAndUpdate(
        { _id: ObjectId(project._id) },
        { imageDescriptions: descrptionsArray }
      );
    })
  );
  response.json("projects updated with image descrptions");
});
module.exports = projectRouter;
