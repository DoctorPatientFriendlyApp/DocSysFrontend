import React from "react";
import { Link } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import { FiMenu } from "react-icons/fi";

export default function SidebarDoctor({ doctor, show, handleClose }) {
  const doctorId = doctor?.id || "0";

  return (
    <>
      {/* TOGGLER (Visible on small screens) */}
      <button
        className="btn btn-primary d-md-none position-fixed top-2 start-2 m-2 shadow"
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
        className="bg-primary text-white"
      >
        {/* <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold">
            {doctor ? `Dr. ${doctor.name}` : "Doctor"}
          </Offcanvas.Title>
        </Offcanvas.Header> */}

        <Offcanvas.Body className="d-flex flex-column p-3">
          <p className="text-light text-center mb-2">Doctor Dashboard</p>

          <hr className="border-light" />

          {/* MENU LINKS */}
          <nav className="d-flex flex-column gap-2">

            <Link
              to={`/doctors/${doctorId}`}
              className="sidebar-item text-white text-decoration-none px-3 py-2 rounded"
              onClick={handleClose}
            >
              <i className="bi bi-person-badge me-2"></i> My Profile
            </Link>

            <Link
              to={`/doctors/${doctorId}/edit`}
              className="sidebar-item text-white text-decoration-none px-3 py-2 rounded"
              onClick={handleClose}
            >
              <i className="bi bi-pencil-square me-2"></i> Edit Profile
            </Link>

            <Link
              to="/doctor/patients"
              className="sidebar-item text-white text-decoration-none px-3 py-2 rounded"
              onClick={handleClose}
            >
              <i className="bi bi-people-fill me-2"></i> My Patients
            </Link>

            <Link
              to={`/patients/add/${doctorId}`}
              className="sidebar-item text-white text-decoration-none px-3 py-2 rounded"
              onClick={handleClose}
            >
              <i className="bi bi-person-plus-fill me-2"></i> Add Patient
            </Link>

            <Link
              to="/doctor/add-existing"
              className="sidebar-item text-white text-decoration-none px-3 py-2 rounded"
              onClick={handleClose}
            >
              <i className="bi bi-person-check-fill me-2"></i> Add Existing Patients
            </Link>

            <Link
              to="/"
              className="sidebar-item text-white text-decoration-none px-3 py-2 rounded mt-2"
              onClick={handleClose}
            >
              <i className="bi bi-house-door me-2"></i> Home
            </Link>
          </nav>

          <div
            className="mt-auto text-center text-light pt-3"
            style={{ fontSize: "13px" }}
          >
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
