// Library
import express from "express";
import passport from "passport";

// Models
import { UserModel } from "../../database/user";

// Validation
import { ValidateSignin, ValidateSignup } from "../../validation/auth";

const Router = express.Router();

/* 
Route       /auth/signup
desc        Register new user
Params      none
Access      Public
Method      POST
*/
Router.post("/signup", async (req, res) => {
  try {
    await ValidateSignup(req.body.credentials);
    await UserModel.findByEmailAndPhone(req.body.credentials);
    const newUser = await UserModel.create(req.body.credentials);
    const token = newUser.generateJwtToken();
    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* 
Route       /auth/signin
desc        Signin with email and password
Params      none
Access      Public
Method      POST
*/
Router.post("/signin", async (req, res) => {
  try {
    await ValidateSignin(req.body.credentials);
    const user = await UserModel.findByEmailAndPassword(req.body.credentials);
    const token = user.generateJwtToken();
    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* 
Route       /auth/google
Desc        Signin with google
Params      none
Access      Public
Method      GET
*/
Router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

/* 
Route       /auth/google/callback
Desc        Google callback function
Params      none
Access      Public
Method      GET
*/
Router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    return res.json({ token: req.session.passport.user.token });
  }
);

export default Router;
