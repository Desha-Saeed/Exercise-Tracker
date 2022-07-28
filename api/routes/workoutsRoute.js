const express = require("express");
const router = express.Router();

const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

// GET all workouts
router.get("/", getWorkouts);

//Get single workout
router.get("/:id", getWorkout);

//Create new Workout
router.post("/", createWorkout);

//Update a workout
router.patch("/:id", updateWorkout);

//Delete a workout
router.delete("/:id", deleteWorkout);

module.exports = router;
