import { Link, Route, Routes } from "react-router-dom";
import { userState, useEffect } from "react";
import Routines from "./routines";
import Activites from "./activities";
import MyRoutines from "./myRoutines";
import Login from "./login";
import Signup from "./signup";

export default function App() {
  return (
    <div>
      <nav>
        <div className="navbar">
          <h1>Fitness Tracker</h1>
          <ul>
            <li>
              <Link to="/">Routines</Link>
            </li>
            <li>
              <Link to="/activites">Activites</Link>
            </li>
            <li>
              <Link to="myroutines">My Routines</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Routines />}></Route>
        <Route path="/activites" element={<Activites />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/myroutines" element={<MyRoutines />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
}
