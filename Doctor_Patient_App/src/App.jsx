  import React from "react";
  // ✅ Import Toastify 
  import AddExistingPatients from "./pages/Patients/AddExistingPatients";
  import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import "bootstrap/dist/css/bootstrap.min.css";
  import { useLocation } from "react-router-dom";
  import { Routes, Route } from "react-router-dom";
  import "./App.css";

  import ProtectedRoute from "./components/auth/ProtectedRoute";
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
  import DoctorLayout from "./layouts/DoctorLayout";
  import PatientLayout from "./layouts/PatientLayout";
  import PublicLayout from "./layouts/PublicLayout";
  import PatientDoctors from "./pages/Patients/PatientDoctors";
  import PatientTreatments from "./pages/Patients/PatientTreatments";
  import AccessDenied  from "./pages/AccessDenied";

  function App() {

    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    const hideNavbarOn = ["/login"];

    const showNavbar =
      !hideNavbarOn.includes(location.pathname) &&
      true;

    return (
      <>
       <Routes>

  {/* PUBLIC ROUTES */}
  <Route element={<PublicLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/doctors/add" element={<AddDoctor />} />
     <Route path="/patients/edit/:id" element={<PatientEdit />} />
    <Route path="/access-denied" element={ <AccessDenied  /> } />

  </Route>

  {/* DOCTOR ROUTES */}
  <Route element={<DoctorLayout />}>
    <Route path="/doctor/home" element={<DoctorDashboard />} />
    <Route path="/doctor/patients" element={<DoctorPatients />} />
    <Route path="/doctor/add-existing" element={<AddExistingPatients />} />
    <Route path="/doctors" element={<DoctorList />} />
 
    <Route path="/doctors/:id" element={<DoctorProfile />} />
    <Route path="/doctors/:id/edit" element={<EditDoctor />} />
  </Route>

  {/* PATIENT ROUTES */}
  <Route element={<PatientLayout />}>
    <Route path="/patient/home" element={
       <ProtectedRoute allowedRoles={['PATIENT']}>
           <PatientDashboard />
        </ProtectedRoute> 
        } />
    <Route path="/patients" element={<PatientList />} />
    <Route path="/patients/view/:id" element={<PatientView />} />
    <Route path="/patients/:id/reports" element={<PatientReports />} />
    <Route path="/patients/:id/treatments" element={<PatientTreatments />} />
    <Route path="/patients/:patientId/doctors" element={ 
      <ProtectedRoute allowedRoles={['PATIENT']}>
          <PatientDoctors />
      </ProtectedRoute> }   
    />
    <Route path="/patients/add/:doctorId?" element={<AddPatient />} />
  </Route>
  
   
</Routes>

          <ToastContainer position="top-center" autoClose={2000} />
      </>
    );
  }

  export default App;
