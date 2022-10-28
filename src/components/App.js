import { Link, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Routines from "./routines";
import Activites from "./activities";
import MyRoutines from "./myRoutines";
import Login from "./login";
import Signup from "./signup";
import CreateRoutine from "./createRoutine"

export default function App() {
  const [username, setUsername] = useState(window.localStorage.getItem("username") || "");
  const [password, setPassword] = useState(window.localStorage.getItem("password") || "");
  const [token, setToken] = useState(window.localStorage.getItem("token") || "");
  const [routines, setRoutines] = useState([]);
  console.log('token :>> ', token);

  useEffect(() => {
    window.localStorage.setItem("username", username)
  }, [username])

  useEffect(() => {
    window.localStorage.setItem("password", password)
  }, [password])

  useEffect(() => {
    window.localStorage.setItem("token", token)
  }, [token])

  const fetchRoutines = async (e) => {
    try {
      const resp = await fetch(
        "http://fitnesstrac-kr.herokuapp.com/api/routines",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await resp.json();
      setRoutines(result);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchRoutines();
  }, []);

  const handleLogout = () => {
    setUsername("");
    setPassword("");
    setToken("");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-xl navbar-light bg-light">
        <div className="container-fluid">
          
            <a className="navbar-brand">Fitness Tracker</a>
          {/* <img src=".../img/barbell.jpeg" alt="barbell" /> */}
          <div className="collapse navbar-collapse show" id="navbarWithDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link" aria-current="page">
                Routines
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/activites" className="nav-link">Activites</Link>
            </li>
            <li className="nav-item">
              <Link to="/myroutines" className="nav-link">My Routines</Link>
            </li>
            <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown link
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
           { token ? <li>
            <Link to="/routines" className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </Link>
            </li> : <Link to="/login" className="btn btn-outline-primary">
                Login
              </Link>}
          </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Routines routines={routines} setRoutines={setRoutines} username={username} token={token}/>}></Route>
        <Route path="/activites" element={<Activites />}></Route>
        <Route
          path="/login"
          element={
            <Login
              setUsername={setUsername}
              setPassword={setPassword}
              username={username}
              password={password}
              setToken={setToken}
            />
          }
        ></Route>
        <Route path="/myroutines" element={<MyRoutines username={username}/>}></Route>
        <Route
          path="/signup"
          element={
            <Signup
              setUsername={setUsername}
              setPassword={setPassword}
              username={username}
              password={password}
              setToken={setToken}
            />
          }
        ></Route>
        <Route path="/createRoutine" element={<CreateRoutine routines={routines} setRoutines={setRoutines} token={token}/>}></Route>
      </Routes>
    </div>
  );
}
