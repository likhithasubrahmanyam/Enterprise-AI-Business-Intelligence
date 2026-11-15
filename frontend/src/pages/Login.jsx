import { useState } from "react";
import { login } from "../services/api";

function Login({ onLogin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {

    event.preventDefault();

    setError("");
    setLoading(true);

    try {

      const data = await login(email, password);

      localStorage.setItem("token", data.access_token);

      onLogin();

    } catch (error) {

      setError(error.message);

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-brand">

          <div className="login-logo">
            EB
          </div>

          <div>
            <h1>Enterprise BI</h1>
            <p>Business Intelligence</p>
          </div>

        </div>

        <div className="login-heading">
          <h2>Sign in</h2>

          <p>
            Sign in to access your business dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

          </div>

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            className="login-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

        </form>

        <div className="login-footer">
          Enterprise Business Intelligence
        </div>

      </div>

    </div>
  );
}

export default Login;