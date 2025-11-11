import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPatientById, deletePatient } from "../../services/patientService";

function PatientView() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatient();
  }, []);

  const fetchPatient = async () => {
    try {
      const data = await getPatientById(id);
      console.log(data);
      setPatient(data);
    } catch (err) {
      console.error("Error fetching patient:", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      await deletePatient(id);
      navigate("/patients");
    }
  };

  if (!patient) {
    return <div className="text-center mt-5">Loading patient profile...</div>;
  }

  return (
    <div className="container mt-5">
      <div
        className="card shadow-lg border-0 mx-auto"
        style={{ maxWidth: "750px", borderRadius: "15px" }}
      >
        <div className="card-body text-center p-4">
          {/* Avatar */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/921/921077.png"
            alt="Patient Avatar"
            className="rounded-circle mb-3 border border-3 border-success"
            width="130"
            height="130"
          />

          {/* Patient Info */}
          <h3 className="card-title text-success">{patient.name}</h3>
          <p className="text-muted mb-1 fs-5">Patient ID: {patient.id}</p>
          <hr />

          {/* Basic Details */}
          <div className="text-start px-4">
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Gender:</strong> {patient.gender || patient.sex}</p>
            <p><strong>Date of Birth:</strong> {patient.dob}</p>
            <p><strong>Mobile:</strong> {patient.mobile}</p>
            <p><strong>Email:</strong> {patient.email || "N/A"}</p>
            <p><strong>Blood Group:</strong> {patient.bloodGroup}</p>
            {patient.address && <p><strong>Address:</strong> {patient.address}</p>}
            {patient.aadhaar && <p><strong>Aadhaar:</strong> {patient.aadhaar}</p>}
            {patient.pan && <p><strong>PAN:</strong> {patient.pan}</p>}
            {patient.zodiacSign && <p><strong>Zodiac Sign:</strong> {patient.zodiacSign}</p>}
          </div>

          <hr />

          {/* Medical History Section */}
          {patient.history && (
            <div className="text-start px-4">
              <h5 className="text-success mt-3 mb-2">🩺 Medical History</h5>
              <p><strong>Current History:</strong> {patient.history.currentHistory}</p>
              <p><strong>Past History:</strong> {patient.history.pastHistory}</p>
              <p><strong>Family History:</strong> {patient.history.familyHistory}</p>
              <p><strong>Surgery History:</strong> {patient.history.surgeryHistory}</p>
              <p><strong>Treatment History:</strong> {patient.history.treatmentHistory}</p>
              {patient.history.personalHistory && (
                <div>
                  <h6 className="mt-2">Personal History</h6>
                  <ul>
                    <li><strong>Diet:</strong> {patient.history.personalHistory.diet}</li>
                    <li><strong>Appetite:</strong> {patient.history.personalHistory.appetite}</li>
                    <li><strong>Desired Food:</strong> {patient.history.personalHistory.desiredFood}</li>
                    <li><strong>Aversion:</strong> {patient.history.personalHistory.aversion}</li>
                    <li><strong>Thirst:</strong> {patient.history.personalHistory.thirst}</li>
                    <li><strong>Sleep:</strong> {patient.history.personalHistory.sleep}</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Reports Section */}
          {patient.reports && patient.reports.length > 0 && (
            <div className="text-start px-4 mt-4">
              <h5 className="text-primary mb-2">📋 Reports</h5>
              {patient.reports.map((report, index) => (
                <div key={index} className="mb-2">
                  <p>
                    <strong>{report.reportType || "Report"}:</strong>{" "}
                    {report.description || "No description"}
                    {report.reportDate && ` (${report.reportDate})`}
                  </p>
                  {report.fileUrl ? (
                    <a
                      href={report.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none text-success"
                    >
                      🔗 View Report
                    </a>
                  ) : (
                    <span className="text-muted">No file available</span>
                  )}
                  {report.notes && (
                    <p className="text-muted mb-1"><strong>Notes:</strong> {report.notes}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Treatments Section */}
          {patient.treatments && patient.treatments.length > 0 && (
            <div className="text-start px-4 mt-4">
              <h5 className="text-danger mb-2">💊 Treatments</h5>
              {patient.treatments.map((t, index) => (
                <div key={index} className="border rounded p-2 mb-2">
                  <p><strong>Medicine:</strong> {t.medicineName}</p>
                  <p><strong>Amount:</strong> {t.amount}</p>
                  <p><strong>Days:</strong> {t.days}</p>
                  <p><strong>Before Condition:</strong> {t.beforeCondition}</p>
                  <p><strong>After Condition:</strong> {t.afterCondition}</p>
                </div>
              ))}
            </div>
          )}

          <hr />

          {/* Action Buttons */}
          <div className="d-flex justify-content-center gap-3 mt-3">
           <Link to={`/patients/edit/${id}`}
                 className="btn btn-warning btn-sm" >
                    Edit
            </Link>

            <Link to={`/patients/${id}/reports`} className="btn btn-info text-white">
              📑 View All Reports
            </Link>

            <button onClick={handleDelete} className="btn btn-danger">
              🗑️ Delete Profile
            </button>
          </div>

          <Link to="/patients" className="btn btn-outline-success mt-4 w-50">
            ← Back to Patient List
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PatientView;
