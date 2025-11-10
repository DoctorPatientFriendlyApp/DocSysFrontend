import React from "react";
import SidebarPatient from "../components/SidebarPatient";

export default function PatientDashboard() {
  return (
    <div className="d-flex flex-column flex-md-row min-vh-100">
      <SidebarPatient />

      <div className="p-4 flex-grow-1 bg-light w-100">
        <h2 className="text-success">Welcome, Sneha 🌸</h2>
        <hr />

        <div className="row justify-content-center mt-4">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card p-3 shadow-sm h-100">
              <h5>Health Summary</h5>
              <ul className="list-unstyled mt-3">
                <li>Age: 25</li>
                <li>Blood Group: B+</li>
                <li>Last Consultation: 07 Nov 2025</li>
              </ul>
              <button className="btn btn-success mt-3 w-100">
                View My Doctors
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
