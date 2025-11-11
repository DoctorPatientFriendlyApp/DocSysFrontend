import React, { useEffect, useState } from "react";
import SidebarPatient from "../../components/Patients/SidebarPatient";

export default function PatientDashboard() {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    // ✅ Fetch logged-in patient from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setPatient(parsed.data || parsed); // handles axios or plain object
      } catch (e) {
        console.error("Error parsing patient info:", e);
      }
    }
  }, []);

  return (
    <div className="d-flex flex-column flex-md-row min-vh-100">
      <SidebarPatient patient={patient} />

      <div className="p-4 flex-grow-1 bg-light w-100">
        <h2 className="text-success">
          {patient ? `Welcome, ${patient.name} 🌸` : "Welcome, Patient 🌸"}
        </h2>
        <p className="text-muted">
          {patient?.email || "patient@example.com"}
        </p>
        <hr />

        <div className="row mt-4 g-4">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card shadow-sm p-3 h-100 text-center">
              <h5>Age</h5>
              <p className="display-6 text-success">
                {patient?.age || "--"}
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="card shadow-sm p-3 h-100 text-center">
              <h5>Blood Group</h5>
              <p className="display-6 text-danger">
                {patient?.bloodGroup || "--"}
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="card shadow-sm p-3 h-100 text-center">
              <h5>Mobile</h5>
              <p className="display-6 text-primary">
                {patient?.mobile || "--"}
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="card shadow-sm p-3 h-100 text-center">
              <h5>Assigned Doctors</h5>
              <p className="display-6 text-info">
                {patient?.doctorIds ? patient.doctorIds.length : 0}
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="card shadow-sm p-3 h-100 text-center">
              <h5>Reports Uploaded</h5>
              <p className="display-6 text-warning">
                {patient?.reports ? patient.reports.length : 0}
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="card shadow-sm p-3 h-100 text-center">
              <h5>Next Appointment</h5>
              <p className="display-6 text-secondary">
                {patient?.nextAppointmentDate || "Not Scheduled"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
