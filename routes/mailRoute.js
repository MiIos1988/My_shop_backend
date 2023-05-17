const express = require("express");
const sendMail = require("../service/mailService");
const mailRoute = express.Router();

mailRoute.post("/send-contact", (req, res) => {
    const body = req.body;
    sendMail(
        body.email,
        "vojvoda1988@gmail.com",
        body.subject,
        body.message
    ).then(() => res.send('Message send.'))
    .catch(error => res.status(415).send(error))

})


module.exports = mailRoute