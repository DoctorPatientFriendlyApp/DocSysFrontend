// src/components/Navbars/DoctorNav.jsx
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"


export default function DoctorNav() {
 const doctor = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login"); 
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/doctor/home">🩺 Doctor Panel</Navbar.Brand>
        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/doctor/home"> Doctor Dashboard </Nav.Link>
            <Nav.Link as={Link} to="/doctor/patients">My Patients</Nav.Link>
               {/* Add Patient (optional doctorId in URL) */}
            <Nav.Link as={Link} to={doctor ? `/patients/add/${doctor.id}` : "/patients/add"} > Add Patient </Nav.Link>
            <Nav.Link as={Link} to={`/doctors/${doctor.id}/edit`}>Edit Doctor</Nav.Link>


            <Button variant="outline-light" size="sm" onClick={logout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
