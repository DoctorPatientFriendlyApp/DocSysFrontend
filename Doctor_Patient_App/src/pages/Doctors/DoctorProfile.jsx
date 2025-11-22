import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getDoctorById, deleteDoctor } from "../../services/doctorService";

function DoctorProfile() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      const data = await getDoctorById(id);
      console.log(data);
      setDoctor(data);
    } catch (err) {
      console.error("Error fetching doctor:", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      await deleteDoctor(id);
      navigate("/doctors");
    }
  };

  if (!doctor) {
    return <div className="text-center mt-5">Loading doctor profile...</div>;
  }

  return (
    <div className="container mt-5">
      <div
        className="card shadow-lg border-0 mx-auto"
        style={{ maxWidth: "650px", borderRadius: "15px" }}
      >
        <div className="card-body text-center p-4 ">
          {/* Avatar */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
            alt="Doctor Avatar"
            className="rounded-circle mb-3 border border-3 border-primary d-block mx-auto"
            width="130"
            height="130"
          />

          {/* Doctor Info */}
          <h3 className="card-title text-primary">Dr. {doctor.name}</h3>
          <p className="text-muted mb-1 fs-5">{doctor.specialization}</p>
          <hr />

          {/* Details */}
          <div className="text-start px-4">
            <p><strong>Email:</strong> {doctor.email}</p>
            <p><strong>Mobile:</strong> {doctor.mobile}</p>
            <p><strong>Age:</strong> {doctor.age}</p>
            <p><strong>Gender:</strong> {doctor.sex}</p>
            <p><strong>Address:</strong> {doctor.address}</p>
            <p><strong>Aadhaar:</strong> {doctor.aadhaar}</p>
            <p><strong>PAN:</strong> {doctor.pan}</p>
            <p>
              <strong>Certificate:</strong>{" "}
              <a
                href={doctor.certificateUrl}
                target="_blank"
                rel="noreferrer"
                className="text-decoration-none text-success"
              >
                View Certificate
              </a>
            </p>
          </div>

          <hr />

          {/* Action Buttons */}
          <div className="d-flex justify-content-center gap-3 mt-3">
            <Link
              to={`/doctors/${id}/edit`}
              className="btn btn-warning text-white"
            >
              ✏️ Edit Profile
            </Link>

            <Link
              to="/doctor/patients"
              className="btn btn-info text-white"
            >
              👨‍⚕️ View Patients
            </Link>

            <button
              onClick={handleDelete}
              className="btn btn-danger"
            >
              🗑️ Delete Profile
            </button>
          </div>

          <Link to="/doctors" className="btn btn-outline-primary mt-4 w-50">
            ← Back to Doctor List
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;
