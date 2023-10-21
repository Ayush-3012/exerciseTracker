import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ExerciseList from "./components/exercise-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component.jsx";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <hr />
        <Routes>
          <Route path="/" Component={ExerciseList} />
          <Route path="/edit/:id" Component={EditExercise} />
          <Route path="/create" Component={CreateExercise} />
          <Route path="/user" Component={CreateUser} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
