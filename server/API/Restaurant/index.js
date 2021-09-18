// libraries
import express from "express";

// Database model
import { RestaurantModel } from "../../database/allModels";

const Router = express.Router();

/* 
Route       /restaurant
Desc        Get all the restaurnt detials based on thecity name
Params      none
Access      Public
Method      GET
*/
Router.get("/", async (req, res) => {
  try {
    const { city } = req.query;
    const restaurants = await RestaurantModel.find({ city });

    return res.json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* 
Route       /restaurant
Desc        Get individual restaurnt detials based on id
Params      id
Access      Public
Method      GET
*/
Router.get("/:id", async (req, res) => {
  try {
    const { _id } = req.params;

    const restaurant = await RestaurantModel.findById(_id);

    if (!restaurant) {
      return res.status(404).json({ error: "Resaurant not found" });
    }

    return res.json({ restaurant });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* 
Route       /restaurant/search
Desc        Get restaurnt detials based on search string
Params      none
Access      Public
Method      GET
*/
Router.get("/search", async (req, res) => {
  try {
    const { searchString } = req.body;

    const restaurants = await RestaurantModel.find({
      name: { $regex: searchString, $options: "i" },
    });

    if (!restaurants) {
      return res
        .status(404)
        .json({ error: `No Restaurant matched with $(searchString)` });
    }

    return res.json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
