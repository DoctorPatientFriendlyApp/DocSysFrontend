import React from "react";
import { Link } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import { FiMenu } from "react-icons/fi";

export default function SidebarPatient({ patient, show, handleClose }) {
  const patientId = patient?.id || "0";

  return (
    <>
      {/* TOGGLER (Visible on small screens) */}
      <button
        className="btn btn-success d-md-none position-fixed top-2 start-2 m-2 shadow"
        onClick={handleClose}
        style={{ zIndex: 2000 }}
      >
        <FiMenu size={24} />
      </button>

      {/* OFFCANVAS SIDEBAR */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        responsive="md"
        className="bg-success text-white"
      >
        {/* <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold">
            {patient ? patient.name : "Patient"}
          </Offcanvas.Title>
        </Offcanvas.Header> */}

        <Offcanvas.Body className="d-flex flex-column p-3">
          <p className="text-light text-center mb-2">Health Dashboard</p>

          <hr className="border-light" />

          {/* MENU LINKS */}
          <nav className="d-flex flex-column gap-2">
            <Link
              to={`/patients/view/${patientId}`}
              className="sidebar-item text-white text-decoration-none px-3 py-2 rounded"
              onClick={handleClose}
            >
              <i className="bi bi-person-circle me-2"></i> My Profile
            </Link>

            <Link
              to={`/patients/${patientId}/doctors`}
              className="sidebar-item text-white text-decoration-none px-3 py-2 rounded"
              onClick={handleClose}
            >
              <i className="bi bi-heart-pulse me-2"></i> My Doctors
            </Link>

            <Link
              to={`/patients/${patientId}/reports`}
              className="sidebar-item text-white text-decoration-none px-3 py-2 rounded"
              onClick={handleClose}
            >
              <i className="bi bi-file-earmark-text me-2"></i> My Reports
            </Link>

            <Link
              to={`/patients/${patientId}/treatments`}
              className="sidebar-item text-white text-decoration-none px-3 py-2 rounded"
              onClick={handleClose}
            >
              <i className="bi bi-capsule-pill me-2"></i> My Treatments
            </Link>

            <Link
              to="/"
              className="sidebar-item text-white text-decoration-none px-3 py-2 rounded mt-2"
              onClick={handleClose}
            >
              <i className="bi bi-house-door me-2"></i> Home
            </Link>
          </nav>

          <div className="mt-auto text-center text-light pt-3" style={{ fontSize: "13px" }}>
            © 2025 HealthCare+
          </div>

          {/* HOVER EFFECT */}
          <style>{`
            .sidebar-item:hover {
              background-color: rgba(255, 255, 255, 0.2);
              transition: 0.3s ease;
            }
          `}</style>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
