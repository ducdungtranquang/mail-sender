/* eslint-disable no-undef */
// routes/emailRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const nodemailer = require("nodemailer");
// eslint-disable-next-line no-unused-vars
const XLSX = require("xlsx");
const Email = require("../models/Email");

// eslint-disable-next-line no-unused-vars
const upload = multer({ dest: "uploads/" });

router.post("/send-emails", async (req, res) => {
  const { emails, subject, body } = req.body;

  // Cấu hình nodemailer
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "tranthideptrai@gmail.com",
      pass: "kori dbhe nvhs emou",
    },
  });

  for (const email of emails) {
    const mailOptions = {
      from: "tranthideptrai@gmail.com",
      to: email,
      subject: subject || "Test Email",
      html: body || "test",
    };

    try {
      await transporter.sendMail(mailOptions);
      const newEmail = new Email({ email });
      await newEmail.save();
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  res.send({ message: "Emails sent successfully" });
});

module.exports = router;
