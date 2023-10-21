import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const CreateExercise = () => {
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/")
      .then((res) => {
        if (res.data.length > 0) {
          setExercise({
            users: res.data.map((user) => user.username),
            username: res.data[0].username,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      .post("http://localhost:5000/exercises/add", exerciseItem)
      .then((res) => {
        console.log(res.data);
      });
    window.location = "/";
  }

  return (
    <div className="container p-3">
      <h3>Create New Exercise Log</h3>
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
            {exercise.users.map(function (user) {
              return (
                <option key={user} value={user ?? ""}>
                  {user}
                </option>
              );
            })}
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
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateExercise;
