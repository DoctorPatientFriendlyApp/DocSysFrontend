import PatientNav from "../components/NavBars/PatientNav";
import { Outlet } from "react-router-dom";

export default function PatientLayout() {
  return (
    <>
      <PatientNav />
      <Outlet />
    </>
  );
}
