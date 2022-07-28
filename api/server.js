const express = require("express");
const mongoose = require("mongoose");
const workoutRoute = require("./routes/workoutsRoute");
require("dotenv").config();

const app = express();

app.use(express.json());

//routes
app.use("/api/workouts", workoutRoute);
const DB = process.env.MONGO_URL.replace(
  "<PASSWORD>",
  process.env.MONGO_PASSWORD
);
//connect to database
mongoose.connect(DB).then(() => console.log("DB connected successfuly"));

//listen to port
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port, ${process.env.PORT}!`);
});
