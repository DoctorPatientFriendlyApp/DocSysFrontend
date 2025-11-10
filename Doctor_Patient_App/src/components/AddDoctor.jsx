import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoctor } from "../services/doctorService";

function AddDoctor() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    sex: "",
    address: "",
    mobile: "",
    aadhaar: "",
    pan: "",
    specialization: "",
    patientIds: "",
  });

  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Prepare form data for multipart upload
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    if (file) formData.append("certificate", file); // file field name must match backend param

    // ✅ Send request to backend
    try {
      await addDoctor(formData);
      alert("Doctor added successfully!");
      navigate("/doctors");
    } catch (err) {
      console.error("Error adding doctor:", err);
      alert("Failed to add doctor");
    }
  };

  return (
    <div className="container mt-3">
      <h2>Add Doctor</h2>
      <form onSubmit={handleSubmit} className="p-3 border rounded">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="form-control mb-2" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="form-control mb-2" required />
        <input name="name" placeholder="Name" onChange={handleChange} className="form-control mb-2" required />
        <input name="specialization" placeholder="Specialization" onChange={handleChange} className="form-control mb-2" />
        <input name="mobile" placeholder="Mobile" onChange={handleChange} className="form-control mb-2" />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} className="form-control mb-2" />

        <select name="sex" onChange={handleChange} className="form-control mb-2" defaultValue="">
          <option value="" disabled>Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>

        <input name="address" placeholder="Address" onChange={handleChange} className="form-control mb-2" />
        <input name="aadhaar" placeholder="Aadhaar" onChange={handleChange} className="form-control mb-2" />
        <input name="pan" placeholder="PAN" onChange={handleChange} className="form-control mb-2" />

        {/* ✅ Upload file field */}
        <input type="file" name="certificate" accept=".pdf,.jpg,.png" onChange={handleFileChange} className="form-control mb-2" />

        <input name="patientIds" placeholder="Patient IDs (comma-separated)" onChange={handleChange} className="form-control mb-2" />

        <button type="submit" className="btn btn-success w-100">Add Doctor</button>
      </form>
    </div>
  );
}

export default AddDoctor;
