import React, { useEffect, useState } from "react";
import { getUnassignedPatients, assignPatientToDoctor } from "../../services/doctorService";
import { toast } from "react-toastify";

const AddExistingPatients = () => {
  const [patients, setPatients] = useState([]);
  const doctor = JSON.parse(localStorage.getItem("user"));

  const loadPatients = async () => {
    try {
        //returns patients who do NOT have any doctor assigned
      const res = await getUnassignedPatients();
      console.log("Unassigned Patients:", res.data);
      setPatients(res.data);
    } catch (err) {
      toast.error("Error fetching patients");
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleAssign = async (patientId) => {
    try {
        //Add that doctor to patient’s doctor list
      await assignPatientToDoctor(patientId, doctor.id);//This calls your backend endpoint /api/patients/{patientId}/assign/{doctorId}.
      toast.success("Patient added successfully!");
      loadPatients(); // refresh list
    } catch (err) {
      toast.error("Failed to assign patient");
    }
  };

  return (
    <div className="container mt-4">
      
      <h3 className="mb-4 text-center">Add Existing Patients</h3>
      {patients.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td>{p.name}</td>
                <td>{p.user.email}</td>
                <td>{p.age}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleAssign(p.id)}
                  >
                    Add to My List
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-muted">No unassigned patients found.</p>
      )}
    </div>
  );
};

export default AddExistingPatients;
