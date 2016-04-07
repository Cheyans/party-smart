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
  var mailOptions = {
    to :  providers.us.map((provider) => {return number + provider}),
    from : "PartySmart",
    text: body
  };

  transporter.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log(error);
    } else if (response) {
      console.log("Succesfully sent to " + number);
    }
  });
}

module.exports.sendSMS = sendSMS;
