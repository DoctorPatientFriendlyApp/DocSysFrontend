import React from "react";
import { Link } from "react-router-dom";

export default function SidebarPatient({ patient ,id }) {
  const patientId = patient?.id || "0";
  console.log("Sidebar Patient ID:",patientId);

  return (
    <div
      className="bg-success text-white p-4 vh-100"
      style={{ width: "240px" }}
    >
      <h4>{patient ? `${patient.name}'s Menu` : "Patient Menu"}</h4>
      <hr />
      <nav className="d-flex flex-column gap-3">
        {/* ✅ Corrected dynamic routes */}
        <Link
          to={`/patients/view/${patientId}`}
          className="text-white text-decoration-none"
        >
          👤 My Profile
        </Link>

        <Link
          to={`/patients/${patientId}/doctors`}
          className="text-white text-decoration-none">
           🩺 My Doctors
        </Link>

      <Link to={`/patients/${patientId}/reports`} className="text-white text-decoration-none">
       📋 My Reports
     </Link>



        <Link
          to={`/patients/${patientId}/treatments`}
          className="text-white text-decoration-none"
        >
          💊 My Treatments
        </Link>

        <Link to="/" className="text-white text-decoration-none">
          ⬅️ Back Home
        </Link>
      </nav>
    </div>
  );
}
