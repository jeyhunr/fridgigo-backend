const nodemailer = require("nodemailer");
require("dotenv").config();

const email = process.env.EMAIL;
const emailPass = process.env.EMAIL_PASSWORD;

let requestConfirmation = (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
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
}


module.exports = requestConfirmation;