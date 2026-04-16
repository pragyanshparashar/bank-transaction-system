const nodemailer = require("nodemailer");
const sendEmail = async (to, subject, text) => {
  try {
    console.log("👉 sendEmail function called");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.log("EMAIL ERROR FULL:", error);
  }
};

module.exports = sendEmail;