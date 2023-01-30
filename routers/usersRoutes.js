const express = require("express");
const { signUpUser, signUpAdmin, logIn, verifyUser, changePasswrd, forgotPasswrd, updateUser, delUser } = require("../controllers/users");
const { authAdmin, isUser } = require("../helpers/authentic")

const userRoute = express.Router();

userRoute.route("/user").post(signUpUser);
userRoute.route("/admin").post(signUpAdmin);
userRoute.route("/login").post(logIn);
userRoute.route("/verifyUser/:userId").post(verifyUser);
userRoute.route("/forgotpassword").post(forgotPasswrd);
userRoute.route("/changepasswrd/:userId/:token").post(changePasswrd);
userRoute.route("/user/:userId").patch(isUser , updateUser);
userRoute.route("/user/:userId").delete(isUser , delUser);


module.exports = userRoute;