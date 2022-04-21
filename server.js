// const path = require('path');
const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
// const result = dotenv.config()
// if (result.error) {
//     throw result.error
// }
// console.log(result.parsed)
// console.log(process.env);
// console.log(process.env.EMAIL);
// console.log(process.env.PASSWORD);
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);

app.use(express.static('build'));
const path = require('path');
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Running on ${PORT}`));

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

router.post("/contact", (req, res) => {
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