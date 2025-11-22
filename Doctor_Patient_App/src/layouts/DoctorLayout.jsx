import DoctorNav from "../components/NavBars/DoctorNav";
import { Outlet } from "react-router-dom";

export default function DoctorLayout() {
  return (
    <>
      <DoctorNav />
      <Outlet />
    </>
  );
}
