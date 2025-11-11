import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand fw-bold" to="/">🏥 HealthSync</Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto align-items-center">
          <li className="nav-item">
            <Link className="nav-link" to="/doctors">Doctors</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/patients">Patients</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/doctor/home">Doctor Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/patient/home">Patient Dashboard</Link>
          </li>

          {/* 🔹 Conditionally render Login or Logout button */}
          <li className="nav-item ms-3">
            {user ? (
              <button
                className="btn btn-danger btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                className="btn btn-light btn-sm text-primary"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
