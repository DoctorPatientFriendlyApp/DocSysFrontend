import React, { useEffect, useState } from "react";
import { getAllPatients, deletePatient } from "../services/patientService";
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
    await deletePatient(id);
    fetchPatients();
  };

  return (
    <div className="container mt-3">
      <h2>Patients</h2>
      <Link to="/patients/add" className="btn btn-primary mb-3">
        Add Patient
      </Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Mobile</th>
            <th>Blood Group</th>
            <th>Action</th>
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
                <button className="btn btn-danger" onClick={() => handleDelete(p.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientList;
