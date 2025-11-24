
import { Link } from 'react-router-dom'
import React from 'react'

function PublicNav() {
  return (
    <div>
         {/* Navbar */}
         <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/40 to-transparent px-4 py-3">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
              <h1
                className="text-2xl font-extrabold"
                style={{ color: "#A5D8FF", textShadow: "2px 4px 12px rgba(0,0,0,0.4)" }}
              >
                MEDICARE
              </h1>

              <div className="flex items-center gap-6">
                <Link to="/login" className="btn btn-primary px-4 py-2 rounded">
                  Login
                </Link>
                <Link to="/doctors/add" className="btn btn-light px-4 py-2 rounded">
                  Register
                </Link>
              </div>
            </div>
          </header>

    </div>
  )
}

export default PublicNav





// // src/components/Navbars/PublicNav.jsx
// import { Navbar, Nav, Container, Button } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import './Navbar.css'


// export default function PublicNav() {
//   const navigate = useNavigate();

//   return (
//    <Navbar expand="lg" className="navbar-gradient shadow-lg py-3">
//   <Container>
//     <Navbar.Brand as={Link} to="/" className="fs-3 fw-bold text-white">
//       🏥 HealthSync
//     </Navbar.Brand>

//     <Navbar.Toggle aria-controls="navbarNav" className="navbar-toggler-icon" />
//     <Navbar.Collapse id="navbarNav">
//       <Nav className="ms-auto align-items-center gap-3">
//         <Button
//           variant="light"
//           size="sm"
//           className="fw-bold shadow-sm btn-hover-3d"
//           onClick={() => navigate("/login")}
//         >
//           Login
//         </Button>
//       </Nav>
//     </Navbar.Collapse>
//   </Container>
// </Navbar>

//   );
// }
