const express = require("express");
const UserModel = require("../models/userModels");
const registerValidation = require("../validation/registerValidation");
const authRoute = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../service/mailService");
const htmlActivation = require("../template/mailTemplate");

authRoute.post("/register", registerValidation, async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  try {
    const newUser = await UserModel.create(req.body);
    newUser.save();

    const activationMailHtml = htmlActivation(`https://my-shop-frontend-dun.vercel.app/activation-account/${newUser?._id}`)
    sendMail(
      "vojvoda19881@gmail.com",
      req.body.email,
      "Test email",
      activationMailHtml
    ).then(() => res.send('User registered.'))
      .catch(error => res.status(415).send(error))

    
  } catch {
      res.status(416).send("Error creating new user");
  }
});

authRoute.post("/login", (req, res) => {
  const body = req.body;
  UserModel.findOne({ email: body.email })
    .then((data) => {
      if (!data) {
        res.status(417).send("Email is not valid");
      } else if (!bcrypt.compareSync(body.password, data.password)) {
        res.status(417).send("Password is not valid");
      } else if (!data.isActive) {
        res
          .status(418)
          .send(
            "You must activate your account. Go to the email and click on the link."
          );
      } else {
        let ts = new Date().getTime();
        data.password = undefined;
        data.isActive = undefined;
        let token = jwt.sign({ ...data, ts }, "log");
        res.send({ token });
      }
    })
    .catch((err) => console.log(err));
});
authRoute.put("/active", (req, res) => {
  const update = { isActive: true };
  UserModel.findOneAndUpdate(req.body, update)
    .then((data) => {
      res.send("ok");
    })
    .catch((err) => console.log(err));
});

module.exports = authRoute;
