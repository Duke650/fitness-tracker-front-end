import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signup({
  setUsername,
  setPassword,
  username,
  password,
  token,
  setToken
}) {
  const navigate = useNavigate();
    console.log('username, signup :>> ', username, password);
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
              password
          }),
        }
      );
      console.log(resp);
      const result = await resp.json();
      console.log("result :>> ", result);
      if (!resp.ok) {
        throw result.error.message;
      }
      setToken(result.data.token);
      
      // navigate("/users/me")
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h1>Sign up</h1>
      <div className="form">
        <form>
          <div className="form-floating mb-3">
            <input
              type="text"
              placeholder="Username"
              className="form-control"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
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
