import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDoctorsByPatientId } from "../../services/patientService";

export default function PatientDoctors() {
  const { patientId } = useParams();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const data = await getDoctorsByPatientId(patientId);
    console.log("Fetched Doctors:", data);
    setDoctors(data);
  };

  return (
    <div className="container mt-4">
      <h2>My Doctors</h2>
      {doctors.length === 0 ? (
        <p>No doctors assigned yet.</p>
      ) : (
        <div className="list-group mt-3">
          {doctors.map((doc) => (
            <div key={doc.id} className="list-group-item">
              <h5>{doc.name}</h5>
              <p><strong>Specialization:</strong> {doc.specialization}</p>
              <p><strong>Email:</strong> {doc.user.email}</p>
              <p><strong>Mobile:</strong> {doc.mobile}</p>
            </div>
          ))}
        </div>
      )}
      <Link to="/patient/home" className="btn btn-secondary mt-3">Back</Link>
    </div>
  );
}
