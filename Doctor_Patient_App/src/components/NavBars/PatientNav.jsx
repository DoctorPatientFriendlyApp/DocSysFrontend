import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function PatientNav() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm border-bottom py-2">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/patient/home"
          className="fw-bold text-success"
          style={{ fontSize: "1.4rem" }}
        >
          🏥 HealthCare+ Patient Panel
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/patient/home" className="fw-semibold me-2">
              Dashboard
            </Nav.Link>

            <Nav.Link 
              as={Link} 
              to={`/patients/${user.id}/doctors`} 
              className="fw-semibold me-2"
            >
              My Doctors
            </Nav.Link>

            <Button 
              variant="danger" 
              size="sm" 
              className="fw-semibold px-3"
              onClick={logout}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
