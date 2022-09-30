const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");

const cookieParser = require("cookie-parser");

const connectDB = require("./src/config/db");
const frazoController=require("./src/controllers/frazoController")
//config .evn to ./src/config/config.evv
dotenv.config({ path: "./src/config/config.env" });

connectDB();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());



if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.BASE_URL,
    })
  );
  app.use(morgan("dev"));
  //Morgan give information each reequest
  //cors allow the react localhost at port 3000 without any problem
}
app.use("/api", require("./src/routes/authroute"));
app.use("/fraazo", frazoController);
const PORT = process.env.PORT || 4000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
