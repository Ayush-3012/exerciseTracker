import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import exercisesRouter from "./routes/exercises.js";
import usersRouter from "./routes/users.js";

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri);
mongoose.connection.once("open", () => {
  console.log("MongoDB connected to database");
});

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
