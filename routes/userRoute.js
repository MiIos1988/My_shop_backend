const express = require("express");
const UserModel = require("../models/userModels");
const userRoute = express.Router();
const stripe = require("stripe");
const sk = "sk_test_51MgyLeAoAwiaPpyxcWshahWIHczrgJi1jlFR8AmPt0mTSjRE9Mi9S2qC2NnRc56sveI5o2M71oLMT1SooRsDKXLY006LAyfgfX"
const stripeObj = stripe(sk)

userRoute.get("/get-all-users", (req, res) => {
    UserModel.find({}).then(data => res.send(data))
    .catch(err => console.log(err))
})

userRoute.put("/is-active", (req, res) => {
    UserModel.findOneAndUpdate({_id: req.body.id}, {isActive: req.body.checked}).then(data => res.send("ok"))
    .catch(err => res.send(err))
})

userRoute.post("/init-payment", async(req, res) => {
    try{
        const payment = await stripeObj.paymentIntents.create({
            amount: parseInt(req.body.amount),
            currency: req.body.currency,
            automatic_payment_methods: {
                enabled: true
            }
        })
        res.send(payment)
    }
    catch{err => res.send(err)}
    
})




module.exports = userRoute;