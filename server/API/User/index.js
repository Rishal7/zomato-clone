// Libraries
import express from "express";

// Database model
import { UserModel } from "../../database/allModels";

const Router = express.Router();

/* 
Route       /user/:_id
Desc        Get user data
Params      _id
Access      Public
Method      GET
*/
Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const getUser = await UserModel.findById(_id);

    if (!getUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ getUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* 
Route       /update/:_id
Desc        Update user data
Params      _id
body        user data
Access      Public
Method      PUT
*/
Router.put("/update/:_id", async (req, res) => {
  try {
    const { userId } = req.params;
    const { userData } = req.body;

    const updateUserData = await UserModel.findByIdAndUpdate(
      userIid,
      { $set: userData },
      { new: true }
    );

    return res.json({ updateUserData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
