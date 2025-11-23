import React, { useEffect, useState } from "react";
import SidebarDoctor from "../../components/Doctors/SidebarDoctor";

export default function DoctorDashboard() {

  const [doctor, setDoctor] = useState(null);

  // Sidebar Toggle State
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setDoctor(parsed.data || parsed);
      } catch (e) {
        console.error("Error parsing doctor info:", e);
      }
    }
  }, []);

  const firstLetter = doctor?.name?.charAt(0).toUpperCase();

  return (
    <div className="d-flex min-vh-100 bg-light">

      {/* OFFCANVAS SIDEBAR */}
      <SidebarDoctor 
        doctor={doctor}
        show={showSidebar}
        handleClose={toggleSidebar}
      />

      {/* MAIN CONTENT */}
      <div className="flex-grow-1 p-3 p-md-4 w-100">

        {/* HEADER */}
        <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
          <div
            className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center shadow"
            style={{ width: "60px", height: "60px", fontSize: "26px", fontWeight: "bold" }}
          >
            {firstLetter}
          </div>

          <div>
            <h3 className="mb-0 fw-bold text-dark">
              {doctor ? `Welcome, Dr. ${doctor.name.split(" ")[0]} 👋` : "Welcome, Doctor"}
            </h3>
            <span className="text-secondary">Your doctor dashboard overview</span>
          </div>
        </div>

        <hr className="mb-4" />

        {/* STAT CARDS */}
        <div className="row g-4">

          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card shadow-sm border-0 p-3 text-center">
              <i className="bi bi-people text-primary display-5"></i>
              <h5 className="mt-2">Patients Assigned</h5>
              <p className="display-6 fw-bold text-primary">
                {doctor?.patientIds ? doctor.patientIds.length : 0}
              </p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card shadow-sm border-0 p-3 text-center">
              <i className="bi bi-file-earmark-check text-success display-5"></i>
              <h5 className="mt-2">Certificates Uploaded</h5>
              <p className="display-6 fw-bold text-success">
                {doctor?.certificateUrl ? 1 : 0}
              </p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card shadow-sm border-0 p-3 text-center">
              <i className="bi bi-patch-check-fill text-warning display-5"></i>
              <h5 className="mt-2">Verification Status</h5>
              <p
                className={`display-6 fw-bold ${
                  doctor?.verified ? "text-success" : "text-danger"
                }`}
              >
                {doctor?.verified ? "Verified" : "Pending"}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
