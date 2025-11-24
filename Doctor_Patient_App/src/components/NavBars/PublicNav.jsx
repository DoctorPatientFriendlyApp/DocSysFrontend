import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
function PublicNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/40 to-transparent px-4 py-3">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          
          {/* Logo */}
          <h1
            className="text-2xl font-extrabold"
            style={{ color: "#A5D8FF", textShadow: "2px 4px 12px rgba(0,0,0,0.4)" }}
          >
            MEDICARE
          </h1>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/login" className="btn btn-primary px-4 py-2 rounded">
              Login
            </Link>
            <Link to="/doctors/add" className="btn btn-light px-4 py-2 rounded">
              Register
            </Link>
          </div>

          {/* Mobile Hamburger */}
              <button
                className="md:hidden flex flex-col gap-1 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
               >
                <span
                    className={`block h-1 w-7 bg-blue-700 rounded transition-all duration-300 ${
                      isOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                  ></span>
                <span
                    className={`block h-1 w-7 bg-blue-700 rounded transition-all duration-300 ${
                      isOpen ? "opacity-0" : ""
                    }`}
                  ></span>
                <span
                    className={`block h-1 w-7 bg-blue-700 rounded transition-all duration-300 ${
                      isOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                  ></span>
              </button>


        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-black/60 backdrop-blur-md p-4 rounded-lg mt-2 mx-4 transition-all duration-300">
            <div className="flex flex-col gap-4">
              <Link
                to="/login"
                className="btn btn-primary w-full py-2 rounded"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/doctors/add"
                className="btn btn-light w-full py-2 rounded"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        )}
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
