import React, { useEffect, useState } from "react";
import SidebarPatient from "../../components/Patients/SidebarPatient";


export default function PatientDashboard() {
  const [patient, setPatient] = useState(null);

  // Sidebar Toggle State
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        console.log("Parsed Patient Info:", parsed);
        setPatient(parsed.data || parsed);
      } catch (e) {
        console.error("Error parsing patient info:", e);
      }
    }
  }, []);

  const firstLetter = patient?.name?.charAt(0).toUpperCase();

  return (
    <div className="d-flex min-vh-100 bg-light">

      {/* OFFCANVAS SIDEBAR */}
      <SidebarPatient
        patient={patient}
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
              {patient ? `Welcome, ${patient.name.split(" ")[0]} 👋` : "Welcome, Patient"}
            </h3>
            <span className="text-secondary">Your health information at a glance</span>
          </div>
        </div>

        <hr className="mb-4" />

        {/* STAT CARDS */}
        <div className="row g-4">

          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card shadow-sm border-0 p-3 text-center">
              <i className="bi bi-person-circle text-primary display-5"></i>
              <h5 className="mt-2">Age</h5>
              <p className="display-6 fw-bold text-success">{patient?.age || "--"}</p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card shadow-sm border-0 p-3 text-center">
              <i className="bi bi-droplet-half text-danger display-5"></i>
              <h5 className="mt-2">Blood Group</h5>
              <p className="display-6 fw-bold text-danger">{patient?.bloodGroup || "--"}</p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card shadow-sm border-0 p-3 text-center">
              <i className="bi bi-phone text-dark display-5"></i>
              <h5 className="mt-2">Mobile</h5>
              <p className="display-6 fw-bold text-primary">{patient?.mobile || "--"}</p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card shadow-sm border-0 p-3 text-center">
              <i className="bi bi-people-fill text-info display-5"></i>
              <h5 className="mt-2">Assigned Doctors</h5>
              <p className="display-6 fw-bold text-info">
                {patient?.doctorIds ? patient.doctorIds.length : 0}
              </p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card shadow-sm border-0 p-3 text-center">
              <i className="bi bi-file-earmark-medical text-warning display-5"></i>
              <h5 className="mt-2">Reports Uploaded</h5>
              <p className="display-6 fw-bold text-warning">
                {patient?.reports ? patient.reports.length : 0}
              </p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card shadow-sm border-0 p-3 text-center">
              <i className="bi bi-calendar-event text-secondary display-5"></i>
              <h5 className="mt-2">Next Appointment</h5>
              <p className="display-6 fw-bold text-secondary">
                {patient?.nextAppointmentDate || "Not Scheduled"}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
