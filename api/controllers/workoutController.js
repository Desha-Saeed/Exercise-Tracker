const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// GET all workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.json({
      status: "success",
      data: workouts,
    });
  } catch (error) {
    console.log(error);
  }
};

// GET a single workout
const getWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout" });
    }
    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({ error: "there is no workout!" });
    }
    res.json({
      status: "success",
      data: workout,
    });
  } catch (error) {
    console.log(error);
  }
};

//Create a new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workout = await Workout.create({ title, reps, load });

    res.status(200).json({
      status: "success",
      data: {
        workout,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//Update an existing workout
const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout" });
    }
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );

    if (!workout) {
      return res.status(404).json({ error: "there is no workout!" });
    }
    res.json({
      status: "success",
      data: workout,
    });
  } catch (error) {
    console.log(error);
  }
};

//Delete an existing workout
const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout" });
    }
    await Workout.findByIdAndDelete(id);
    res.json({
      status: "success",
      data: `workout with id ${id} deleted successfully`,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
