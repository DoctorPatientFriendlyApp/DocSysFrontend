
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container d-flex flex-column justify-content-center align-items-center text-center min-vh-100 p-4 position-relative overflow-hidden">
    
      <h1 className="mb-3 text-gradient fw-bold animate-fade">🏥 HealthSync</h1>
      <h5 className="mb-4 text-muted animate-fade delay-1">
        Doctor–Patient Management System
      </h5>

      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 animate-fade delay-2">
        <button
          className="btn btn-success btn-lg shadow-lg btn-hover-3d w-100 w-md-auto"
          onClick={() => navigate("/login?role=patient")}
        >
          Login
        </button>
        <button
          className="btn btn-outline-primary btn-lg shadow-sm btn-hover-3d w-100 w-md-auto"
          onClick={() => navigate("/doctors/add")}
        >
          Register as Doctor
        </button>
      </div>

      <p className="mt-5 text-muted animate-fade delay-3 fst-italic">
        “Connecting doctors and patients for better care.”
      </p>
    </div>
  );
}
