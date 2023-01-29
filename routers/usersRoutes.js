const express = require("express");
const { signUpUser, signUpAdmin, logIn, verifyUser } = require("../controllers/users");

const userRoute = express.Router();

userRoute.route("/user").post(signUpUser);
userRoute.route("/admin").post(signUpAdmin);
userRoute.route("/login").post(logIn);
userRoute.route("/verifyUser/:userId").post(verifyUser);

module.exports = userRoute;