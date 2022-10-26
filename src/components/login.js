import { useState } from "react"
import { Link } from "react-router-dom";

export default function Login() {

    const [username, setUsername ] = useState("");
    const [password, setPassword ] = useState("");
    
    return (
        <div>
            <h1>Log In</h1>
            <form>
                <input type="text"
                        placeholder="Username"
                        onChange={e => setUsername(e.target.value)}
                />
                <input type="text"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                />
                <input type="submit" 
                        value="Log in"
                        // onClick={handleLogin}
                />
            </form>
            <Link to="/signup">Don't have an account? Sign up here!</Link>
        </div>
    )
}