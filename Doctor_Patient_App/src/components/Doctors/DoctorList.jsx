import React, { useEffect, useState } from "react";
import { getAllDoctors, deleteDoctor } from "../../services/doctorService";
import { Link } from "react-router-dom";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const data = await getAllDoctors();
    setDoctors(data);
  };

  const handleDelete = async (id) => {
    await deleteDoctor(id);
    fetchDoctors();
  };

  return (
    <div className="container mt-3">
      <h2>Doctors</h2>
      <Link to="/doctors/add" className="btn btn-primary mb-3">
        Add Doctor
      </Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialization</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.name}</td>
              <td>{doc.specialization}</td>
              <td>{doc.mobile}</td>
              <td>
                <Link
                  to={`/doctors/${doc.id}`}
                  className="btn btn-info btn-sm me-2"
                >
                  View
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(doc.id)}
                >
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

export default DoctorList;
