import React, { useState } from "react";
import { addPatient } from "../services/patientService";
import { useNavigate } from "react-router-dom";

function AddPatient() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    address: "",
    mobile: "",
    aadhaar: "",
    pan: "",
    dob: "",
    bloodGroup: "",
    sex: "",
    socialEconomicalStatus: "",
    zodiacSign: "",
    active: true,
    doctorIds: [],
  });

  const navigate = useNavigate();

  // Update form on change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle doctorIds input as comma-separated values
  const handleDoctorIdsChange = (e) => {
    const ids = e.target.value.split(",").map((id) => Number(id.trim()));
    setForm({ ...form, doctorIds: ids });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPatient(form);
    navigate("/patients");
  };

  return (
    <div className="container mt-3">
      <h2>Register Patient</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="form-control mb-2" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="form-control mb-2" />
        <input name="name" placeholder="Name" onChange={handleChange} className="form-control mb-2" />
        <input name="age" placeholder="Age" onChange={handleChange} className="form-control mb-2" />
        <input name="address" placeholder="Address" onChange={handleChange} className="form-control mb-2" />
        <input name="mobile" placeholder="Mobile" onChange={handleChange} className="form-control mb-2" />
        <input name="aadhaar" placeholder="Aadhaar" onChange={handleChange} className="form-control mb-2" />
        <input name="pan" placeholder="PAN" onChange={handleChange} className="form-control mb-2" />
        <input type="date" name="dob" onChange={handleChange} className="form-control mb-2" />
        <input name="bloodGroup" placeholder="Blood Group" onChange={handleChange} className="form-control mb-2" />

        {/* Enum Dropdowns */}
        <select name="sex" onChange={handleChange} className="form-control mb-2">
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>

        <select name="socialEconomicalStatus" onChange={handleChange} className="form-control mb-2">
          <option value="">Select Social Class</option>
          <option value="LOW">Low</option>
          <option value="MIDDLE">Middle</option>
          <option value="HIGH">High</option>
        </select>

        <select name="zodiacSign" onChange={handleChange} className="form-control mb-2">
          <option value="">Select Zodiac Sign</option>
          <option value="ARIES">Aries</option>
          <option value="TAURUS">Taurus</option>
          <option value="GEMINI">Gemini</option>
          <option value="CANCER">Cancer</option>
          <option value="LEO">Leo</option>
          <option value="VIRGO">Virgo</option>
          <option value="LIBRA">Libra</option>
          <option value="SCORPIO">Scorpio</option>
          <option value="SAGITTARIUS">Sagittarius</option>
          <option value="CAPRICORN">Capricorn</option>
          <option value="AQUARIUS">Aquarius</option>
          <option value="PISCES">Pisces</option>
        </select>

        <input
          name="doctorIds"
          placeholder="Doctor IDs (comma separated)"
          onChange={handleDoctorIdsChange}
          className="form-control mb-2"
        />

        <button type="submit" className="btn btn-success">
          Register Patient
        </button>
      </form>
    </div>
  );
}

export default AddPatient;
