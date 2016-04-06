var nodemailer = require("nodemailer");
var config = require("./config");
var providers = require("./provider");

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
  service: "gmail", // no need to set host or port etc.
  auth: {
    user: config.user,
    pass: config.pass
  }
});

//Very malicious, I know
function sendSMS(number, body) {
  providers.us.forEach((provider) => {
    sendMessage({
      from: "partysmart",
      to: number + provider,
      text: body
    }, 0);
  });
}

module.exports.sendSMS = sendSMS;

function sendMessage(mailOptions, callStack) {
  transporter.sendMail(mailOptions, (error, response) => {
    if (error && callStack < 5) {
      sendMessage(mailOptions, ++callStack);
    } else if (response) {
      console.log(response);
    }
  });
}
