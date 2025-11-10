import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand" to="/">🏥 HealthSync</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
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
        </ul>
      </div>
    </nav>
  );
}
