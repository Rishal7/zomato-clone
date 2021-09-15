import express from "express";
import cors from "cors";
import helmet from "helmet";

const zomato = express();

zomato.use(express());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(cors());
zomato.use(helmet());

zomato.get("/", (req, res) => {
  res.json({ message: "Setup Success" });
});

zomato.listen(4000, () => console.log("Server is up and running"));
