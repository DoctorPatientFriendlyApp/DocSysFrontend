import React, { useEffect, useState } from "react";
import SidebarDoctor from "../../components/Doctors/SidebarDoctor";

export default function DoctorDashboard() {
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    // ✅ Fetch logged-in doctor from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setDoctor(parsed.data || parsed); // handles axios response or plain object
      } catch (e) {
        console.error("Error parsing doctor info:", e);
      }
    }
  }, []);

  return (
    <div className="d-flex flex-column flex-md-row min-vh-100">
      <SidebarDoctor doctor={doctor} />

      <div className="p-4 flex-grow-1 bg-light w-100">
        <h2 className="text-primary">
          {doctor ? `Dr.${doctor.name} ` : " Doctor "}
        </h2>
        <p className="text-muted">{doctor?.specialization}</p>
        <hr />

        <div className="row mt-4 g-4">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card shadow-sm p-3 h-100 text-center">
              <h5>Patients Assigned</h5>
              <p className="display-6 text-primary">
                {doctor?.patientIds ? doctor.patientIds.length : 0}
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="card shadow-sm p-3 h-100 text-center">
              <h5>Certificates Uploaded</h5>
              <p className="display-6 text-success">
                {doctor?.certificateUrl ? 1 : 0}
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="card shadow-sm p-3 h-100 text-center">
              <h5>Verification Status</h5>
              <p
                className={`display-6 ${
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
