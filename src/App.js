import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormComponent from "./components/Registration/Registration";
import Dashboard from "./components/dashboard/dashboard";
import Login from "./components/Login/Login";
import { Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const handleLogout = () => {
    const userConfirmed = window.confirm("Are you sure you want to logout?");

    if (userConfirmed) {
      // Clear session storage and redirect to the login page if user confirmed
      sessionStorage.clear();
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
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </ul>
        </nav>
        <div className="App">
          <Routes>
            <Route path="/register" element={<FormComponent />} />
            <Route path="/login" element={<Login />} />
            <ProtectedRoute path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
