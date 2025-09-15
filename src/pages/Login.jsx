import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";

function Login({ setIsLoggedIn, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "user" && password === "123") {
      const loggedInUser = { name: "User", role: "user", email: "user@example.com" };
      setUser(loggedInUser);
      setIsLoggedIn(true);
      navigate("/Profile");
    } else if (username === "admin" && password === "admin123") {
      const loggedInUser = { name: "Admin", role: "admin" };
      setUser(loggedInUser);
      setIsLoggedIn(true);
      navigate("/Admin");
    } else {
      setError("Invalid credentials!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h3>Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary w-100">Login</button>
        </form>
        <p className="mt-3">
          User: <b>user / 123</b> <br />
          Admin: <b>admin / admin123</b>
        </p>
      </div>
    </div>
  );
}

export default Login;
