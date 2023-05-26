const express = require("express");
const nodemailer = require("nodemailer");

// const projectRouter = express.Router();

// This will help us connect to the database
// const Project = require("../models/project");
// const { Promise } = require("mongodb");
const contactRouter = express.Router();
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

contactEmail.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready to Send");
    }
});

contactRouter.post("/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const mail = {
        from: name,
        to: process.env.EMAIL,
        subject: "Contact Form Message",
        html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
        if (error) {
            res.json({ status: "ERROR" });
        } else {
            res.json({ status: "Message Sent" });
        }
    });
});

module.exports = contactRouter;