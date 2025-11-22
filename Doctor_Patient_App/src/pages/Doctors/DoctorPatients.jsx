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

    // ✅ fetch only once after mount
    fetchPatients();
  }, []); // <-- empty dependency array prevents infinite re-renders

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">My Patients</h2>
     
    <div className="d-flex justify-content-end mb-3">
       <button className="btn btn-danger"
              onClick={() => navigate('/doctor/home')} >
           Back to Dashboard
       </button>
    </div>


      {Array.isArray(patients) && patients.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Address </th>
             <th> Action </th> 
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
                <td> <button type="button" className="btn btn-success btn-sm"
                            onClick={() => navigate(`/patients/view/${patient.id}`)} >
                         View
                     </button>
               </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-muted">No patients found under you.</p>
      )}
    </div>
  );
};

export default DoctorPatients;
