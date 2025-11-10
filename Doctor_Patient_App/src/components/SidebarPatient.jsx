import React from "react";
import { Link } from "react-router-dom";

export default function SidebarPatient() {
  return (
    <div className="bg-success text-white p-4 vh-100" style={{ width: "240px" }}>
      <h4>Patient Menu</h4>
      <hr />
      <nav className="d-flex flex-column gap-3">
        <Link to="/patients" className="text-white text-decoration-none">
          🩺 Assigned Doctors
        </Link>
        <Link to="/" className="text-white text-decoration-none">
          ⬅️ Back Home
        </Link>
      </nav>
    </div>
  );
}
