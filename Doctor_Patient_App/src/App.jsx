import React from "react";
// ✅ Import Toastify
import AddExistingPatients from "./components/AddExistingPatients";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import DoctorPatients from "./pages/DoctorPatients";
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
        <Route path="/doctor/home" element={<DoctorDashboard />} />
        <Route path="/patient/home" element={<PatientDashboard />} />
        <Route path="/doctors/:id" element={<DoctorProfile />} />
        <Route path="/doctors/:id/edit/" element={<EditDoctor />} />

        <Route path="/doctor/patients" element={<DoctorPatients />} />
       <Route path="/doctor/add-existing" element={<AddExistingPatients />} />
                                   {/* optional doctorId */}
        <Route path="/patients/add/:doctorId?" element={<AddPatient />} />
      
      </Routes>

        <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
