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
    return <div className="text-center mt-5 fw-bold fs-4">Loading patient profile...</div>;
  }

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      {/* HEADER CARD */}
      <div className="container mb-4">
        <div className="card shadow-lg border-0" style={{ borderRadius: "18px" }}>
          <div className="card-body d-flex align-items-center p-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/921/921077.png"
              alt="Patient Avatar"
              className="rounded-circle border border-3 border-primary me-4"
              width="120"
              height="120"
            />
            <div>
              <h2 className="text-primary fw-bold mb-0">{patient.name}</h2>
              <p className="text-muted fs-5 mb-1">Patient ID: {patient.id}</p>
              <span className="badge bg-success fs-6 px-3 py-2">Active Patient</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row g-4">
          {/* LEFT SIDE - BASIC INFORMATION */}
          <div className="col-lg-4">
            <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <div className="card-header bg-primary text-white fw-bold">Basic Information</div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  {patient.age && <li className="list-group-item"><strong>Age:</strong> {patient.age}</li>}
                  {patient.sex && <li className="list-group-item"><strong>Gender:</strong> {patient.sex}</li>}
                  {patient.dob && <li className="list-group-item"><strong>DOB:</strong> {patient.dob}</li>}
                  {patient.mobile && <li className="list-group-item"><strong>Mobile:</strong> {patient.mobile}</li>}
                  {patient.email && <li className="list-group-item"><strong>Email:</strong> {patient.email}</li>}
                  {patient.bloodGroup && <li className="list-group-item"><strong>Blood Group:</strong> {patient.bloodGroup}</li>}
                  {patient.address && <li className="list-group-item"><strong>Address:</strong> {patient.address}</li>}
                </ul>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="card shadow-sm border-0 mt-4" style={{ borderRadius: "15px" }}>
              <div className="card-body text-center">
                <Link className="btn btn-warning w-100 mb-2" to={`/patients/edit/${id}`}>✏️ Edit Profile</Link>
                <Link className="btn btn-info text-white w-100 mb-2" to={`/patients/${id}/reports`}>View All Reports</Link>
                <Link className="btn btn-info text-white w-100 mb-2" to={`/patients/${id}/treatments`}>View All Treatments</Link>
                <button className="btn btn-danger w-100 mb-2" onClick={handleDelete}>🗑️ Delete Patient</button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - FULL DETAILS */}
          <div className="col-lg-8">
            {/* PATIENT DESCRIPTION */}
            {patient.patientDescription && Object.values(patient.patientDescription).some(v => v) && (
              <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: "15px" }}>
                <div className="card-header bg-secondary text-white fw-bold">Patient Description</div>
                <div className="card-body">
                  <ul>
                    {Object.entries(patient.patientDescription)
                      .filter(([_, value]) => value)
                      .map(([key, value]) => (
                        <li key={key}><strong>{key}:</strong> {value}</li>
                      ))}
                  </ul>
                </div>
              </div>
            )}

            {/* GENERAL EXAMINATION */}
            {patient.generalExamination && Object.values(patient.generalExamination).some(v => v) && (
              <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: "15px" }}>
                <div className="card-header bg-secondary text-white fw-bold">General Examination</div>
                <div className="card-body">
                  <ul>
                    {Object.entries(patient.generalExamination)
                      .filter(([_, value]) => value)
                      .map(([key, value]) => <li key={key}><strong>{key}:</strong> {value}</li>)}
                  </ul>
                </div>
              </div>
            )}

            {/* SYSTEMIC EXAMINATION */}
            {patient.systemicExamination && Object.values(patient.systemicExamination).some(v => v) && (
              <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: "15px" }}>
                <div className="card-header bg-secondary text-white fw-bold">Systemic Examination</div>
                <div className="card-body">
                  <ul>
                    {Object.entries(patient.systemicExamination)
                      .filter(([_, value]) => value)
                      .map(([key, value]) => <li key={key}><strong>{key}:</strong> {value}</li>)}
                  </ul>
                </div>
              </div>
            )}

            {/* MEDICAL HISTORY */}
            {patient.history && Object.values(patient.history).some(v => v) && (
              <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: "15px" }}>
                <div className="card-header bg-primary text-white fw-bold">Medical History</div>
                <div className="card-body">
                  {patient.history.chiefComplaint && <p><strong>Chief Complaint:</strong> {patient.history.chiefComplaint}</p>}
                  {patient.history.pastHistory && <p><strong>Past:</strong> {patient.history.pastHistory}</p>}
                  {patient.history.familyHistory && <p><strong>Family:</strong> {patient.history.familyHistory}</p>}
                  {patient.history.surgeryHistory && <p><strong>Surgery:</strong> {patient.history.surgeryHistory}</p>}
                  {patient.history.treatmentHistory && <p><strong>Treatment:</strong> {patient.history.treatmentHistory}</p>}

                  {patient.history.personalHistory && Object.values(patient.history.personalHistory).some(v => v) && (
                    <div className="mt-3">
                      <h6 className="fw-bold text-secondary">Personal History</h6>
                      <ul>
                        {Object.entries(patient.history.personalHistory)
                          .filter(([_, value]) => value)
                          .map(([key, value]) => <li key={key}><strong>{key}:</strong> {value}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* VITAL SIGNS */}
            {patient.vitalSigns && Object.values(patient.vitalSigns).some(v => v) && (
              <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: "15px" }}>
                <div className="card-header bg-danger text-white fw-bold">Vital Signs</div>
                <div className="card-body">
                  <ul>
                    {Object.entries(patient.vitalSigns)
                      .filter(([_, value]) => value)
                      .map(([key, value]) => <li key={key}><strong>{key}:</strong> {value}</li>)}
                  </ul>
                </div>
              </div>
            )}

            {/* DIAGNOSIS DETAILS */}
            {patient.diagnosisDetails && Object.values(patient.diagnosisDetails).some(v => v) && (
              <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: "15px" }}>
                <div className="card-header bg-dark text-white fw-bold">Diagnosis Details</div>
                <div className="card-body">
                  <ul>
                    {Object.entries(patient.diagnosisDetails)
                      .filter(([_, value]) => value)
                      .map(([key, value]) => <li key={key}><strong>{key}:</strong> {value}</li>)}
                  </ul>
                </div>
              </div>
            )}

            {/* REPORTS */}
            {patient.reports?.length > 0 &&
              patient.reports.some(r => Object.values(r).some(v => v)) && (
              <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: "15px" }}>
                <div className="card-header bg-info text-white fw-bold">Reports</div>
                <div className="card-body">
                  {patient.reports
                    .filter(r => Object.values(r).some(v => v))
                    .map((report, index) => (
                      <div key={index} className="mb-3 p-2 border rounded">
                        {report.reportType && <p><strong>{report.reportType}:</strong> {report.description}</p>}
                        {report.fileUrl && <a href={report.fileUrl} target="_blank" rel="noopener noreferrer">🔗 View Report</a>}
                      </div>
                  ))}
                </div>
              </div>
            )}

            {/* TREATMENTS */}
            {patient.treatments?.length > 0 &&
              patient.treatments.some(t => Object.values(t).some(v => v)) && (
              <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: "15px" }}>
                <div className="card-header bg-danger text-white fw-bold">Treatments</div>
                <div className="card-body">
                  {patient.treatments
                    .filter(t => Object.values(t).some(v => v))
                    .map((t, index) => (
                      <div key={index} className="border rounded p-2 mb-2 bg-light">
                        {t.medicineName && <p><strong>Medicine:</strong> {t.medicineName}</p>}
                        {t.amount && <p><strong>Amount:</strong> {t.amount}</p>}
                        {t.days && <p><strong>Days:</strong> {t.days}</p>}
                        {t.beforeCondition && <p><strong>Before Condition:</strong> {t.beforeCondition}</p>}
                        {t.afterCondition && <p><strong>After Condition:</strong> {t.afterCondition}</p>}
                      </div>
                  ))}
                </div>
              </div>
            )}

            {/* PRESCRIPTION */}
            {patient.prescription && Object.values(patient.prescription).some(v => v) && (
              <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: "15px" }}>
                <div className="card-header bg-success text-white fw-bold">Prescription</div>
                <div className="card-body">
                  <ul>
                    {Object.entries(patient.prescription)
                      .filter(([_, value]) => value)
                      .map(([key, value]) => <li key={key}><strong>{key}:</strong> {value}</li>)}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientView;
