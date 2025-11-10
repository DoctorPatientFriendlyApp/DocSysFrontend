import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid bg-light d-flex flex-column justify-content-center align-items-center text-center min-vh-100 p-4">
      <h1 className="mb-3 text-primary">🏥 HealthSync</h1>
      <h5 className="mb-4 text-secondary">Doctor–Patient Management System</h5>

      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
     
        <button
          className="btn btn-success btn-lg w-100 w-md-auto"
          onClick={() => navigate("/login?role=patient")}
        >
           Login 
        </button>
      </div>

      {/* ✅ Register Doctor Button */}
      <div className="mt-4">
        <button
          className="btn btn-outline-primary btn-md"
          onClick={() => navigate("/doctors/add")}
        >
           Register as Doctor
        </button>
      </div>

      <p className="mt-5 text-muted">
        “Connecting doctors and patients for better care.”
      </p>
    </div>
  );
}
