import React from "react";
import "./App.css";
import Login from "./pages/Login";
import DoctorProfile from "./pages/DoctorProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import DoctorList from "./components/DoctorList";
import AddDoctor from "./components/AddDoctor";
import PatientList from "./components/PatientList";
import AddPatient from "./components/AddPatient";
import Home from "./pages/Home";
import EditDoctor from "./pages/EditDoctor";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      {/* ✅ Navbar */}
      <NavBar />

      {/* ✅ Routes */}
      <Routes>
         <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/doctors/add" element={<AddDoctor />} />
        <Route path="/patients" element={<PatientList />} />
        <Route path="/patients/add" element={<AddPatient />} />
        <Route path="/doctor/home" element={<DoctorDashboard />} />
        <Route path="/patient/home" element={<PatientDashboard />} />
        <Route path="/doctors/:id" element={<DoctorProfile />} />
        <Route path="/doctors/:id/edit/" element={<EditDoctor />} />
      </Routes>
    </>
  );
}

export default App;
