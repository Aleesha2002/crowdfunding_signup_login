const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const cors = require("cors");
const authRoute = require("./routes/Auth");
const userRoute = require("./routes/User");

app.use(express.json());
app.use(cors());

//ROUTES
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

// MONGOOSE SETUP
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(console.log("Connected to Mongodb"))
  .catch((err) => console.log(err));

mongoose.set("strictQuery", true);

app.listen("5000", () => {
  console.log("Backend is running");
});
