// Library
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Models
import { UserModel } from "../../database/user";

const Router = express.Router();

/* 
Route       /signup
desc        Register new user
Params      none
Access      Public
Method      POST
*/
Router.post("/signup", async (req, res) => {
  try {
    const { email, password, fullname, phonenumber } = req.body.credentials;
    const checkUserByEmail = await UserModel.findOne({ email });
    const checkUserByPhone = await UserModel.findOne({ phonenumber });

    // Check whether email exists
    if (checkUserByEmail || checkUserByPhone) {
      return res.json({ email: "User already exists!" });
    }

    // Hash password
    const bcryptSalt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, bcryptSalt);

    // Save to DB
    await UserModel.create({
      ...req.body.credentials,
      password: hashedPassword,
    });

    // Generate JWT auth token
    const token = jwt.sign({ user: { fullname, email } }, "ZomatoApp");

    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
