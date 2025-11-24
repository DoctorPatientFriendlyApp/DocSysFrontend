import PatientNav from "../components/NavBars/PatientNav";
import { Outlet } from "react-router-dom";
import Footer from "../components/NavBars/Footer";


export default function PatientLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <PatientNav />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}