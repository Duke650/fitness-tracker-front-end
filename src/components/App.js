import { Link, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Routines from "./routines";
import Activites from "./activities";
import MyRoutines from "./myRoutines";
import Login from "./login";
import Signup from "./signup";
import CreateRoutine from "./createRoutine";
import { callApi } from "../api/utils";

export default function App() {
  const [username, setUsername] = useState(
    window.localStorage.getItem("username") || ""
  );
  const [password, setPassword] = useState(
    window.localStorage.getItem("password") || ""
  );
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || ""
  );
  const [routines, setRoutines] = useState([]);
  const [routineName, setRoutineName] = useState("");
  const [routineGoal, setRoutineGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [activities, setActivities] = useState([]);
  const [myRoutines, setMyRoutines] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    window.localStorage.setItem("username", username);
  }, [username]);

  useEffect(() => {
    window.localStorage.setItem("password", password);
  }, [password]);

  useEffect(() => {
    window.localStorage.setItem("token", token);
  }, [token]);

  const fetchRoutines = async (e) => {
    try {
      const data = await callApi({ path: "/routines" });
      setRoutines(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchRoutines();
  }, []);

  const fetchMyRoutines = async () => {
    try {
      const resp = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await resp.json();
      setMyRoutines(result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    setUsername("");
    setPassword("");
    setToken("");
  };

  const handleDelete = async (idToDelete) => {
    try {
      await callApi({
        method: "DELETE",
        token,
        path: `/routines/${idToDelete}`,
      });
      const newRoutines = routines.filter((r) => r.id !== idToDelete);
      setRoutines(newRoutines);
      fetchMyRoutines();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-xl navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">Fitness Tracker</a>
          {/* <img src=".../img/barbell.jpeg" alt="barbell" /> */}
          <div
            className="collapse navbar-collapse show"
            id="navbarWithDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link" aria-current="page">
                  Routines
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/activites" className="nav-link">
                  Activites
                </Link>
              </li>
              {token && (
                <li className="nav-item">
                  <Link to="/myroutines" className="nav-link">
                    My Routines
                  </Link>
                </li>
              )}
            </ul>
            {token ? (
              <Link
                to="/routines"
                className="btn btn-outline-danger logout-btn"
                onClick={handleLogout}
              >
                Logout
              </Link>
            ) : (
              <Link to="/login" className="btn btn-outline-primary">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <Routines
              routines={routines}
              setRoutines={setRoutines}
              username={username}
              handleDelete={handleDelete}
              fetchRoutines={fetchRoutines}
              token={token}
              activities={activities}
            />
          }
        ></Route>
        <Route
          path="/activites"
          element={
            <Activites
              token={token}
              activities={activities}
              setActivities={setActivities}
            />
          }
        ></Route>
        <Route
          path="/login"
          element={
            <Login
              setUsername={setUsername}
              setPassword={setPassword}
              username={username}
              password={password}
              setToken={setToken}
              error={error}
              setError={setError}
            />
          }
        ></Route>
        <Route
          path="/myroutines"
          element={
            <MyRoutines
              username={username}
              handleDelete={handleDelete}
              routines={routines}
              setRoutines={setRoutines}
              activities={activities}
              token={token}
              fetchMyRoutines={fetchMyRoutines}
              myRoutines={myRoutines}
              setMyRoutines={setMyRoutines}
              routineName={routineName}
              setRoutineName={setRoutineName}
              routineGoal={routineGoal}
              setRoutineGoal={setRoutineGoal}
              isPublic={isPublic}
              setIsPublic={setIsPublic}
            />
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <Signup
              setUsername={setUsername}
              setPassword={setPassword}
              username={username}
              password={password}
              setToken={setToken}
              error={error}
              setError={setError}
            />
          }
        ></Route>
        <Route
          path="/createRoutine"
          element={
            <CreateRoutine
              setRoutines={setRoutines}
              token={token}
              routineName={routineName}
              setRoutineName={setRoutineName}
              routineGoal={routineGoal}
              setRoutineGoal={setRoutineGoal}
              isPublic={isPublic}
              setIsPublic={setIsPublic}
              error={error}
              setError={setError}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}
