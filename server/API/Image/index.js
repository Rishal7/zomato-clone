// Libraries
import express from "express";
import multer from "multer";

// Database model
import { ImageModel } from "../../database/allModels";

// Upload to S3
import { s3Upload } from "../../Utils/AWS/s3";

const Router = express.Router();

// Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* 
Route       /image
Desc        Uploads given images to S3 bucket and saves file link to mongoDB
Params      none
Access      Public
Method      POST
*/
Router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    // S3 bucket opyions
    const bucketOptions = {
      Bucket: "zomato--clone",
      Key: file.originalname,
      Body: file.buffer,
      Content: file.mimetype,
      ACL: "public-read", // Acces Control List
    };

    const uploadImage = await s3Upload(bucketOptions);

    return res.status(200).json({ uploadImage });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
