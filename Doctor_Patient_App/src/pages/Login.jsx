import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { loginDoctor } from "../services/doctorService"
import { loginPatient } from "../services/patientService";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "", role: "DOCTOR" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const loginData = {
    email: form.email,
    password: form.password,
  };

  try {
    const resp = form.role === "DOCTOR"
      ? await loginDoctor(loginData)
      : await loginPatient(loginData);

    console.log(resp);
    localStorage.setItem("user", JSON.stringify(resp));
    toast.success(`Welcome ${resp.name || resp.email}!`);

    navigate(form.role === "DOCTOR" ? "/doctor/home" : "/patient/home");
  } catch (err) {
    console.error("Login error:", err);
    toast.error("Invalid email or password!");
  }
};


  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <h2 className="text-center mb-4">Login</h2>

      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="form-select"
          >
            <option value="DOCTOR">Doctor</option>
            <option value="PATIENT">Patient</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
     <Link
       to={form.role === "DOCTOR" ? "/doctors/add" : "/patients/add"}
         className="btn btn-link mt-3 d-block text-center "
       >
       Not registered? Register as {form.role === "DOCTOR" ? "Doctor" : "Patient"} 
     </Link>

    </div>
  );
};

export default Login;
