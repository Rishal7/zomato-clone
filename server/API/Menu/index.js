// Libraries
import express from "express";

// Database model
import { MenuModel, ImageModel } from "../../database/allModels";

const Router = express.Router();

/* 
Route       menu/list
Desc        Get all list of menu based on id
Params      _id
Access      Public
Method      GET
*/
Router.get("/list/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const menus = await MenuModel.findById({ _id });

    return res.json({ menus });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* 
Route       menu/image
Desc        Get all menu images based on id
Params      _id
Access      Public
Method      GET
*/
Router.get("/image/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const menus = await ImageModel.findOne({ _id });

    return res.json({ menus });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
