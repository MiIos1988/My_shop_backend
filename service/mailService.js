const nodemailer = require("nodemailer");
const path = require("path");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "vojvoda19881@gmail.com",
        pass: "tzuhspkfqkzbsbes",
    }
})
const sendMail = function (from, to, subject, html) {

    let mailOptions = {
        from: `"Shop" ${from}`, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: html, // html body
    }
    return transporter.sendMail(mailOptions)
}

module.exports = sendMail