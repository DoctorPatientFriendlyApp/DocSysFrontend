// import PublicNav from "../components/NavBars/PublicNav";
import { Outlet } from "react-router-dom";



export default function PublicLayout() {
  return (
    <>
      {/* <PublicNav /> */}
      <Outlet />
     
    </>
  );
}
