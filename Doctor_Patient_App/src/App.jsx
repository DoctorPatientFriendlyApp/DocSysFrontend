import React from "react";
// ✅ Import Toastify
import AddExistingPatients from "./pages/patients/AddExistingPatients";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import PatientReports from "./pages/Patients/PatientReports";
import PatientView from "./pages/Patients/PatientView";
import PatientEdit from "./pages/Patients/PatientEdit";
import DoctorPatients from "./pages/Doctors/DoctorPatients";
import Login from "./pages/Login";
import DoctorProfile from "./pages/Doctors/DoctorProfile";
import DoctorList from "./components/Doctors/DoctorList";
import AddDoctor from "./components/Doctors/AddDoctor";
import PatientList from "./components/Patients/PatientList";
import AddPatient from "./components/Patients/AddPatient";
import Home from "./pages/Home";
import EditDoctor from "./pages/Doctors/EditDoctor";
import DoctorDashboard from "./pages/Doctors/DoctorDashboard";
import PatientDashboard from "./pages/Patients/PatientDashboard";
import NavBar from "./components/NavBar";
import PatientDoctors from "./pages/Patients/PatientDoctors";
import PatientTreatments from "./pages/Patients/PatientTreatments";

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
        <Route path="/patients/view/:id" element={<PatientView />} />
        <Route path="/patients/edit/:id" element={<PatientEdit />} />
        <Route path="/patients/:patientId/reports" element={<PatientReports />} />
        <Route path="/patients/:id/treatments" element={<PatientTreatments />} />
        <Route path="/doctor/patients" element={<DoctorPatients />} />
       <Route path="/doctor/add-existing" element={<AddExistingPatients />} />
       <Route path="/patients/:patientId/doctors" element={<PatientDoctors />} />
                                   {/* optional doctorId */}
        <Route path="/patients/add/:doctorId?" element={<AddPatient />} />
      
      </Routes>

        <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
