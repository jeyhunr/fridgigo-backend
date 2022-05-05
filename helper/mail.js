const nodemailer = require("nodemailer");
require("dotenv").config();

const email = process.env.EMAIL_ADDRESS;
const emailPass = process.env.EMAIL_PASSWORD;
const SMTPHost = process.env.SMTP_HOST;
const SMTPPort = process.env.SMTP_PORT;

let requestConfirmation = (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: SMTPHost,
    port: SMTPPort,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: email,
      pass: emailPass
    }

  });

  const mailOptions = {
    from: "fridgiGO Team <noreply@fridgigo.com>",
    to: to,
    sender: "frigiGO Team",
    subject: subject,
    html: html
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = requestConfirmation;
