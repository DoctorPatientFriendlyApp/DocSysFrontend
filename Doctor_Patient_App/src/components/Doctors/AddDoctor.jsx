import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addDoctor } from "../../services/doctorService";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaAddressCard, FaFileAlt, FaUserMd } from "react-icons/fa";

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

    const formData = new FormData();
  for (const key in form) {
    if(key !== "patientIds") formData.append(key, form[key]);
  }

  if(form.patientIds){
    form.patientIds.split(",").forEach(id => formData.append("patientIds", id));
  }
    if (file) formData.append("certificate", file);

    try {
      await addDoctor(formData);
      toast.success("Doctor added successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Error adding doctor:", err);
      toast.error("Failed to add doctor");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 mx-auto" style={{ maxWidth: "600px", borderRadius: "15px" }}>
        <div className="card-body p-4">
          <h3 className="card-title text-center mb-4 text-primary">
            <FaUserMd className="me-2" /> Register Doctor
          </h3>

          <form onSubmit={handleSubmit}>

            <div className="mb-3 input-group">
              <span className="input-group-text"><FaEnvelope /></span>
              <input type="email" name="email" placeholder="Email" onChange={handleChange} className="form-control" required />
            </div>

            <div className="mb-3 input-group">
              <span className="input-group-text"><FaLock /></span>
              <input type="password" name="password" placeholder="Password" onChange={handleChange} className="form-control" required />
            </div>

            <div className="mb-3 input-group">
              <span className="input-group-text"><FaUser /></span>
              <input name="name" placeholder="Full Name" onChange={handleChange} className="form-control" required />
            </div>

            <div className="mb-3 input-group">
              <span className="input-group-text"><FaUserMd /></span>
              <input name="specialization" placeholder="Specialization" onChange={handleChange} className="form-control" required/>
            </div>

            <div className="mb-3 input-group">
              <span className="input-group-text"><FaPhone /></span>
              <input name="mobile" placeholder="Mobile" onChange={handleChange} className="form-control"  required />
            </div>

            <div className="row g-3">
              <div className="col-md-6 input-group mb-3">
                <span className="input-group-text">🎂</span>
                <input name="age" type="number" placeholder="Age" onChange={handleChange} className="form-control" required />
              </div>
              <div className="col-md-6 input-group mb-3">
                <span className="input-group-text">⚧</span>
                <select name="sex" onChange={handleChange} className="form-select" defaultValue="">
                  <option value="" disabled>Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>

            <div className="mb-3 input-group">
              <span className="input-group-text"><FaAddressCard /></span>
              <input name="address" placeholder="Address" onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3 input-group">
              <span className="input-group-text">🆔</span>
              <input name="aadhaar" placeholder="Aadhaar" onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3 input-group">
              <span className="input-group-text">💳</span>
              <input name="pan" placeholder="PAN" onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label htmlFor="certificate" className="form-label">📄 Upload Degree Certification</label>
              <input type="file" title='Upload Certificate' name="certificate" id="certificate" accept=".pdf,.jpg,.png" onChange={handleFileChange} className="form-control" />
            </div>

            <div className="mb-3">
              <input name="patientIds" placeholder="Patient IDs (comma-separated)" onChange={handleChange} className="form-control" />
            </div>

            <button type="submit" className="btn btn-success w-100 mb-2">Register Doctor</button>
            <Link to="/login" className="d-block text-center text-decoration-none">Already registered? Login here</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddDoctor;
