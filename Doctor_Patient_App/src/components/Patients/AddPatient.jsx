import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { addPatient } from "../../services/patientService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddPatient() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (doctorId) {
      setForm((prev) => ({
        ...prev,
        doctorIds: [Number(doctorId)],
      }));
    }
  }, [doctorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDoctorIdsChange = (e) => {
    const ids = e.target.value
      .split(",")
      .map((id) => Number(id.trim()))
      .filter((id) => !isNaN(id));
    setForm({ ...form, doctorIds: ids });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation: check required fields
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      await addPatient(form);
      toast.success("Patient registered successfully!");
      setTimeout(() => navigate("/patients"), 1500); // navigate after showing toast
    } catch (err) {
      console.error(err);
      toast.error("Failed to register patient. Try again!");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-9">
          <div className="card shadow-lg p-4 border-0 rounded-4">
            <h2 className="text-center text-primary mb-4">Register Patient</h2>
            <form onSubmit={handleSubmit}>

              {/* Row for Name, Email */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name *"
                    onChange={handleChange}
                    className="form-control mb-2"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    onChange={handleChange}
                    className="form-control mb-2"
                    required
                  />
                </div>
              </div>

              {/* Row for Password, Mobile */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password *"
                    onChange={handleChange}
                    className="form-control mb-2"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    name="mobile"
                    placeholder="Mobile"
                    onChange={handleChange}
                    className="form-control mb-2"
                  />
                </div>
              </div>

              {/* Row for Age, DOB */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    name="age"
                    type="number"
                    placeholder="Age"
                    onChange={handleChange}
                    className="form-control mb-2"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    name="dob"
                    type="date"
                    onChange={handleChange}
                    className="form-control mb-2"
                  />
                </div>
              </div>

              {/* Row for Gender & Blood Group */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <select
                    name="sex"
                    onChange={handleChange}
                    className="form-select mb-2"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <input
                    name="bloodGroup"
                    placeholder="Blood Group"
                    onChange={handleChange}
                    className="form-control mb-2"
                  />
                </div>
              </div>

              {/* Address, Aadhaar, PAN */}
              <div className="mb-3">
                <input
                  name="address"
                  placeholder="Address"
                  onChange={handleChange}
                  className="form-control mb-2"
                  required
                />
                <input
                  name="aadhaar"
                  placeholder="Aadhaar"
                  onChange={handleChange}
                  className="form-control mb-2"
                />
                <input
                  name="pan"
                  placeholder="PAN"
                  onChange={handleChange}
                  className="form-control mb-2"
                />
              </div>

              {/* Social Status & Zodiac */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <select
                    name="socialEconomicalStatus"
                    onChange={handleChange}
                    className="form-select mb-2"
                  >
                    <option value="">Select Social Class</option>
                    <option value="LOW">Low</option>
                    <option value="MIDDLE">Middle</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <select
                    name="zodiacSign"
                    onChange={handleChange}
                    className="form-select mb-2"
                  >
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
                </div>
              </div>

              {/* Doctor IDs */}
              <input
                name="doctorIds"
                placeholder="Doctor IDs (comma separated)"
                value={form.doctorIds.join(", ")}
                onChange={handleDoctorIdsChange}
                className="form-control mb-3"
                disabled={!!doctorId}
              />

              <button type="submit" className="btn btn-success w-100 mb-2">
                Register Patient
              </button>
            </form>

            <Link
              to="/login"
              className="btn btn-link d-block text-center mt-2"
            >
              Already registered? Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPatient;
