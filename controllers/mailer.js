require("dotenv").config();
const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();

let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MY_MAIL_USER_ID, // your email
    pass: process.env.MY_MAIL_PASS, // your email password
  },
});

router.post("/send", (req, res) => {
  //   return res.send("hit");
  try {
    let mailOptions = {
      from: process.env.MY_MAIL_USER_ID, // sender address
      to: process.env.RECIEVE_MAIL_ID, // list of receivers
      subject: req.body.subject, // Subject line
      text: `Message from: ${req.body.name}, email: ${req.body.email}, message: ${req.body.message}`, // plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: ", info.messageId);
      console.log("Preview URL: ", nodemailer.getTestMessageUrl(info));
    });
    res.redirect("/");
  } catch (err) {
    res.status(400).json({ error: "Somthing went wrong" });
  }
});

module.exports = router;
