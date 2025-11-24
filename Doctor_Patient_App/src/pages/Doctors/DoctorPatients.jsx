import React, { useEffect, useState } from "react"; 
import { getPatientsByDoctorId } from "../../services/doctorService";  
import { useNavigate } from 'react-router-dom';

const DoctorPatients = () => {

  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const doctor = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        if (!doctor?.id) return;
        const resp = await getPatientsByDoctorId(doctor.id);
        console.log("Patients API response:", resp.data);
        setPatients(resp.data);
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="container mt-4">

      {/* PAGE HEADER */}
      <div className="row align-items-center mb-3">
        <div className="col-12 col-md-6 text-center text-md-start">
          <h2 className="fw-bold">My Patients</h2>
        </div>

        <div className="col-12 col-md-6 text-center text-md-end mt-2 mt-md-0">
          <button
            className="btn btn-danger w-100 w-md-auto"
            onClick={() => navigate('/doctor/home')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* TABLE + RESPONSIVENESS */}
      {Array.isArray(patients) && patients.length > 0 ? (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-striped align-middle">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Address</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((patient, index) => (
                <tr key={patient.id}>
                  <td>{index + 1}</td>
                  <td>{patient.name}</td>
                  <td>{patient.email}</td>
                  <td>{patient.age}</td>
                  <td>{patient.address}</td>

                  <td className="text-center">
                    <button
                      type="button"
                      className="btn btn-success btn-sm px-3"
                      onClick={() => navigate(`/patients/view/${patient.id}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      ) : (
        <p className="text-center text-muted mt-4">
          No patients found under you.
        </p>
      )}

    </div>
  );
};

export default DoctorPatients;
