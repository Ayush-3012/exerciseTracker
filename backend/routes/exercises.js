import express from "express";
import Exercise from "../models/exercise.model.js";

const exerciseRouter = express();

exerciseRouter.get("/", (req, res) => {
  Exercise.find()
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error" + err));
});

exerciseRouter.post("/add", (req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch((err) => res.status(400).json("Error" + err));
});

exerciseRouter.get("/:id", (req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error" + err));
});

exerciseRouter.delete("/:id", (req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted.!"))
    .catch((err) => res.status(400).json("Error" + err));
});

exerciseRouter.post("/update/:id", (req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json("Exercise updated.!"))
        .catch((err) => res.status(400).json("Error" + err));
    })
    .catch((err) => res.status(400).json("Error" + err));
});

export default exerciseRouter;
