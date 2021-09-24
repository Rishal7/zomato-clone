// Libraries
import express from "express";

// Database model
import { ReviewModel } from "../../database/allModels";

const Router = express.Router();

/* 
Route       /review/:resId
Desc        Get all reviews related to a particular restaurant
Params      resId
Access      Public
Method      GET
*/
Router.get("/:resId", async (req, res) => {
  try {
    const { resId } = req.params;

    const reviews = await ReviewModel.find({ restaurant: resId });

    return res.json({ reviews });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* 
Route       /review/new
Desc        Add new food review/rating
Params      none
Body        review object
Access      Public
Method      POST
*/
Router.post("/new", async (req, res) => {
  try {
    const { reviewData } = req.body;

    await ReviewModel.create({ ...reviewData });

    return res.json({ review: "Review added" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* 
Route       /review/delete
Desc        Delete food review/rating
Params      none
Body        none
Access      Public
Method      DELETE
*/
Router.delete("/delete/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    await ReviewModel.findByIdAndDelete(_id);

    return res.json({ review: "Review deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
