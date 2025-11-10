import React from "react";
import { Link } from "react-router-dom";

export default function SidebarDoctor({ doctor }) {
  return (
    <div className="bg-primary text-white p-4 vh-100" style={{ width: "240px" }}>
      <h4>Doctor Menu</h4>
      <hr />
      <nav className="d-flex flex-column gap-3">
        <Link to="/doctors" className="text-white text-decoration-none">
           My Patients
        </Link>

        {/* ✅ Pass doctorId dynamically */}
        <Link
          to={doctor ? `/patients/add/${doctor.id}` : "#"}
          className="text-white text-decoration-none"
        >
          Add Patient
        </Link>

        <Link to={doctor ? `/doctors/${doctor.id}`: "#"} className="text-white text-decoration-none">
           Profile
        </Link>

        <Link
          to={doctor ? `/doctors/${doctor.id}/edit/` : "#"}
          className="text-white text-decoration-none"
        >
          Edit Profile
        </Link>

        <Link to="/" className="text-white text-decoration-none">
          ⬅️ Back Home
        </Link>
      </nav>
    </div>
  );
}
