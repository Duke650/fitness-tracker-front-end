import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signup({
  setUsername,
  setPassword,
  username,
  password,
  token,
  setToken,
  error,
  setError
}) {
  const navigate = useNavigate();
  console.log("username, signup :>> ", username, password);
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(
        "http://fitnesstrac-kr.herokuapp.com/api/users/register",
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
      if (!resp.ok) {
        setError(result.error)
      }
      setError("")
      setToken(result.token);

      navigate("/myroutines")
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h1>Sign up</h1>
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
            value="Sign up"
            className="btn btn-primary"
            id="login-btn"
            onClick={handleSignup}
          />
        </form>
      </div>
    </div>
  );
}
