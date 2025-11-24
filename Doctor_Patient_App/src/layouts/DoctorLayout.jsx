import DoctorNav from "../components/NavBars/DoctorNav";
import { Outlet } from "react-router-dom";
import Footer from "../components/NavBars/Footer";


export default function DoctorLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <DoctorNav />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}