// src/components/Navbars/PublicNav.jsx
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'


export default function PublicNav() {
  const navigate = useNavigate();

  return (
   <Navbar expand="lg" className="navbar-gradient shadow-lg py-3">
  <Container>
    <Navbar.Brand as={Link} to="/" className="fs-3 fw-bold text-white">
      🏥 HealthSync
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="navbarNav" className="navbar-toggler-icon" />
    <Navbar.Collapse id="navbarNav">
      <Nav className="ms-auto align-items-center gap-3">
        <Button
          variant="light"
          size="sm"
          className="fw-bold shadow-sm btn-hover-3d"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

  );
}
