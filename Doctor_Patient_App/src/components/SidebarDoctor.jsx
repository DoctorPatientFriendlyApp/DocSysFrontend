import React from "react";
import { Link } from "react-router-dom";

export default function SidebarDoctor() {
  // ✅ Get doctor data from localStorage (or Context if you use one)
  const doctor = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-primary text-white p-4 vh-100" style={{ width: "240px" }}>
      <h4>Doctor Menu</h4>
      <hr />
      <nav className="d-flex flex-column gap-3">
        <Link to="/doctor/patients" className="text-white text-decoration-none">
          My Patients
        </Link>

        {/* Add Patient (optional doctorId in URL) */}
        <Link
          to={doctor ? `/patients/add/${doctor.id}` : "/patients/add"}
          className="text-white text-decoration-none"
        >
          Add Patient
        </Link>

        {/* ✅ Profile dynamically uses logged-in doctor ID */}
        <Link
          to={doctor ? `/doctors/${doctor.id}` : "#"}
          className="text-white text-decoration-none"
        >
          Profile
        </Link>

        <Link
          to={doctor ? `/doctors/${doctor.id}/edit` : "#"}
          className="text-white text-decoration-none"
        >
          Edit Profile
        </Link>

        <Link to="/doctor/add-existing" className="text-white text-decoration-none">
          Add Existing Patients
       </Link>


        <Link to="/" className="text-white text-decoration-none">
          ⬅️ Back Home
        </Link>
      </nav>
    </div>
  );
}
