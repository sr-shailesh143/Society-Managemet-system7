const nodemailer = require("nodemailer");

const transPorter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shaileshvpatel18@gmail.com",
    pass: "xtwy elkm rjqr xgcl",
  },
});

async function senData(to, subject, otp) {
  const mailFormat = {
    from: "shaileshvpatel18@gmail.com",
    to: to,
    subject: subject,
    html: `<h1>Hello 😊</h1>
            Your Forgot password Otp was <b>${otp}</b>`,
  };
  await transPorter.sendMail(mailFormat, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("mail sent");
    }
  });
}
module.exports = senData;
