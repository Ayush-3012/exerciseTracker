import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditExercise = () => {
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
  });

  const _id = useParams().id;

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/" + _id)
      .then((res) => {
        setExercise({
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date),
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [_id]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setExercise(() => {
      return {
        ...exercise,
        [name]: value,
      };
    });
  };

  const onChangeDate = (date) => {
    setExercise({ ...exercise, date: date });
  };

  function onSubmit(event) {
    event.preventDefault();

    const exerciseItem = {
      username: exercise.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date,
    };

    console.log(exerciseItem);

    axios
      .post("http://localhost:5000/exercises/update/" + _id, exerciseItem)
      .then((res) => {
        console.log(res.data);
      });
    window.location = "/";
  }

  return (
    <div className="container p-3">
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group my-2">
          <label>Username: </label>
          <select
            required
            className="form-control"
            name="username"
            value={exercise.username ?? ""}
            onChange={onChange}
          >
            <option value={exercise.username ?? ""}>{exercise.username}</option>
          </select>
        </div>
        <div className="form-group my-2">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            name="description"
            value={exercise.description ?? ""}
            onChange={onChange}
          />
        </div>
        <div className="form-group my-2">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            name="duration"
            value={exercise.duration ?? ""}
            onChange={onChange}
          />
        </div>
        <div className="form-group my-2">
          <label>Date: </label>
          <div>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={exercise.date}
              onChange={onChangeDate}
            />
          </div>
        </div>

        <div className="form-group my-2">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
