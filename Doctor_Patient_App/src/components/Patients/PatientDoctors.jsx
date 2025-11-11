import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDoctorsForPatient } from "../../services/patientService";

export default function PatientDoctors() {
  const { id } = useParams();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

   
  const fetchDoctors = async () => {
    const data = await getDoctorsForPatient(id);
    console.log("Fetched Doctors:", data);
    setDoctors(data);
  };

  return (
    <div className="container mt-4">
      <h3 className="text-success mb-4">🩺 My Doctors</h3>
      <Link to="/patients/dashboard" className="btn btn-secondary mb-3">
        ⬅ Back
      </Link>

      <div className="row">
        {doctors.length > 0 ? (
          doctors.map((d) => (
            <div key={d.id} className="col-md-4 mb-3">
              <div className="card shadow-sm p-3 h-100">
                <h5 className="text-primary">Dr. {d.name}</h5>
                <p>{d.specialization}</p>
                <p className="text-muted">{d.email}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No doctors assigned yet.</p>
        )}
      </div>
    </div>
  );
}
