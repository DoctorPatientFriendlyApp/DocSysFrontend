import React from "react";
import { Link } from "react-router-dom";

export default function SidebarPatient({ patient }) {
  const patientId = patient?.id || "0";

  return (
    <div
      className="bg-success text-white p-4 d-flex flex-column shadow-lg"
      style={{
        width: "250px",
        minHeight: "100vh",
        borderTopRightRadius: "25px",
        borderBottomRightRadius: "25px",
      }}
    >
      {/* HEADER */}
      <div className="text-center mb-4">
        <h4 className="fw-bold mt-2">
          {patient ? patient.name : "Patient"}
        </h4>
        <span className="text-light">Health Dashboard</span>
      </div>

      <hr className="border-light" />

      {/* MENU */}
      <nav className="d-flex flex-column gap-2">
        <Link
          to={`/patients/view/${patientId}`}
          className="sidebar-item text-white text-decoration-none px-3 py-2 rounded"
        >
          <i className="bi bi-person-circle me-2"></i> My Profile
        </Link>

        <Link
          to={`/patients/${patientId}/doctors`}
          className="sidebar-item text-white text-decoration-none px-3 py-2 rounded"
        >
          <i className="bi bi-heart-pulse me-2"></i> My Doctors
        </Link>

        <Link
          to={`/patients/${patientId}/reports`}
          className="sidebar-item text-white text-decoration-none px-3 py-2 rounded"
        >
          <i className="bi bi-file-earmark-text me-2"></i> My Reports
        </Link>

        <Link
          to={`/patients/${patientId}/treatments`}
          className="sidebar-item text-white text-decoration-none px-3 py-2 rounded"
        >
          <i className="bi bi-capsule-pill me-2"></i> My Treatments
        </Link>

        <Link
          to="/"
          className="sidebar-item text-white text-decoration-none px-3 py-2 rounded mt-2"
        >
          <i className="bi bi-house-door me-2"></i> Home
        </Link>
      </nav>

      {/* FOOTER */}
      <div className="mt-auto text-center text-light pt-3" style={{ fontSize: "13px" }}>
        © 2025 HealthCare+
      </div>

      {/* CSS */}
      <style>{`
        .sidebar-item:hover {
          background-color: rgba(255, 255, 255, 0.2);
          transition: 0.3s ease;
        }
      `}</style>
    </div>
  );
}
