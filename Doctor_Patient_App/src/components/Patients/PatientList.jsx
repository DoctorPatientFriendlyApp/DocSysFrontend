import React, { useEffect, useState } from "react";
import { getAllPatients, deletePatient } from "../../services/patientService";
import { Link } from "react-router-dom";

function PatientList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const data = await getAllPatients();
    setPatients(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      await deletePatient(id);
      fetchPatients();
    }
  };

  return (
    <div className="container mt-3">
      <h2>Patients</h2>
      <Link to="/patients/add" className="btn btn-primary mb-3">
        Add Patient
      </Link>

      <table className="table table-bordered table-striped align-middle">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Mobile</th>
            <th>Blood Group</th>
            <th style={{ width: "220px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.mobile}</td>
              <td>{p.bloodGroup}</td>
              <td>
                <div className="btn-group" role="group">
                  <Link
                    to={`/patients/view/${p.id}`}
                    className="btn btn-info btn-sm"
                  >
                    View
                  </Link>
                
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientList;
