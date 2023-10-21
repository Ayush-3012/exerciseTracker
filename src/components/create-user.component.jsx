import { useState } from "react";
import axios from "axios";

const CreateUser = () => {
  const [username, setUsername] = useState("");

  const onChange = (event) => {
    setUsername(event.target.value);
  };

  function onSubmit(event) {
    event.preventDefault();

    const userItem = {
      username: username,
    };

    console.log(userItem);

    axios.post("http://localhost:5000/users/add", userItem).then((res) => {
      console.log(res.data);
    });

    setUsername("");
  }
  return (
    <div className="container p-3">
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group py-2">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={onChange}
          />
        </div>
        <div className="form-group py-2">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
