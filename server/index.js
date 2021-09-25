require("dotenv").config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

// Configs
import googleAuthConfig from "./config/google.config";
import routerConfig from "./config/route.config";

// Routes
import Auth from "./API/Auth/index";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
import Menu from "./API/Menu";
import Image from "./API/Image";
import Orders from "./API/Orders";
import Reviews from "./API/Reviews";
import User from "./API/User";

// Database connection
import ConnectDB from "./database/connection";

const zomato = express();

// Passport config
googleAuthConfig(passport);
routerConfig(passport);

zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(cors());
zomato.use(helmet());
zomato.use(passport.initialize());
zomato.use(passport.session());

zomato.get("/", (req, res) => {
  res.json({ message: "Setup Success" });
});

zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);
zomato.use("/menu", Menu);
zomato.use("/image", Image);
zomato.use("/order", Orders);
zomato.use("/review", Reviews);
zomato.use("/user", User);

zomato.listen(4000, () =>
  ConnectDB()
    .then(() => console.log("Server is up and running"))
    .catch(() =>
      console.log("Server is running, but database connection failed ...")
    )
);
