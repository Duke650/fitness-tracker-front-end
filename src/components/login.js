import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({
  username,
  password,
  setToken,
  setPassword,
  setUsername,
  error,
  setError
}) {
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(
        "http://fitnesstrac-kr.herokuapp.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );
      const result = await resp.json();
      console.log("result :>> ", result);

      if (!resp.ok) {
        setError(result.error) 
        throw result.message;
        
      }

      setToken(result.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      
    }
  };

  return (
    <div>
      <h1>Log In</h1>
      <div className="form">
        <form>
          <input
            type="text"
            placeholder="Username"
            className="form-control"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="form-control"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div>{error}</div>}
          <input
            type="submit"
            value="Log in"
            className="btn btn-primary"
            id="login-btn"
            onClick={handleLogin}
          />
        </form>
      </div>
      <Link to="/signup" className="signup">
        Don't have an account? Sign up here!
      </Link>
    </div>
  );
}
