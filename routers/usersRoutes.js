const express = require("express");
const { signUpUser, signUpAdmin, logIn, verifyUser, changePasswrd, forgotPasswrd } = require("../controllers/users");

const userRoute = express.Router();

userRoute.route("/user").post(signUpUser);
userRoute.route("/admin").post(signUpAdmin);
userRoute.route("/login").post(logIn);
userRoute.route("/verifyUser/:userId").post(verifyUser);
userRoute.route("/forgotpassword").post(forgotPasswrd);
userRoute.route("/changepasswrd/:userId/:token").post(changePasswrd);

module.exports = userRoute;