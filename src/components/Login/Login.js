import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { email, password };

    try {
      const response = await fetch("http://13.50.172.202:3001/v0/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      } else {
        const data = await response.json();
        console.log(data.data.user.accessToken);
        sessionStorage.setItem("token", data.data.user.accessToken);
        sessionStorage.setItem("userData", JSON.stringify(data.data.user));
        alert("Login successful:", data);
        window.location.pathname = "/";
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p style={{ marginTop: "10px" }}>
          Not registered? <Link to="/register">Register here</Link>.
        </p>
      </form>
    </div>
  );
};

export default Login;
