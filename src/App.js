import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FormComponent from "./components/Registration/Registration";
import Dashboard from "./components/dashboard/dashboard";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState, useEffect } from "react";

function App() {
  const [loggedOut, setLoggedOut] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setLoggedOut(false);
    } else {
      setLoggedOut(true);
    }
  }, []);

  const handleLogout = () => {
    const userConfirmed = window.confirm("Are you sure you want to logout?");

    if (userConfirmed) {
      // Clear session storage and redirect to the login page if user confirmed
      sessionStorage.clear();
      setLoggedOut(true);
      setTimeout(() => {
        window.location.pathname = "/login";
      }, 1000);
    }
  };

  return (
    <>
      <Router>
        <nav className="navbar">
          <div className="nav-brand">
            <Link to="/">My App</Link>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/register">Register</Link>
            </li>

            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              {!loggedOut ? (
                <button className="logoutBtn" onClick={handleLogout}>
                  Log Out
                </button>
              ) : (
                <button className="loginBtn">
                  <Link to="/login">Login</Link>
                </button>
              )}
            </li>
          </ul>
        </nav>
        <div className="App">
          <Routes>
            <Route path="/register" element={<FormComponent />} />
            <Route
              path="/login"
              element={
                <Login setLoggedOut={setLoggedOut} loggedOut={loggedOut} />
              }
            />
            <ProtectedRoute path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
