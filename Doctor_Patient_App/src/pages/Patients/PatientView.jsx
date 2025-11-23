import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPatientById, deletePatient } from "../../services/patientService";
import { Tabs, Tab } from "react-bootstrap"; // Make sure react-bootstrap is installed


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

  const renderList = (dataObj) => {
    if (!dataObj || !Object.values(dataObj).some(v => v)) {
      return <p className="text-center text-muted fst-italic">No Data Available</p>;
    }
    return (
      <ul className="list-unstyled mb-0">
        {Object.entries(dataObj)
          .filter(([_, value]) => value)
          .map(([key, value]) => (
            <li key={key} className="mb-2"><strong>{key}:</strong> {value}</li>
          ))}
      </ul>
    );
  };

  const renderArray = (arr, renderItem) => {
    if (!arr || !arr.some(item => Object.values(item).some(v => v))) {
      return <p className="text-center text-muted fst-italic">No Data Available</p>;
    }
    return arr.map(renderItem);
  };

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      {/* HEADER CARD */}
      <div className="container mb-4">
        <div className="card shadow-lg border-0" style={{ borderRadius: "18px" }}>
          <div className="card-body d-flex align-items-center p-4 flex-column flex-md-row text-center text-md-start">
            <img
              src="https://cdn-icons-png.flaticon.com/512/921/921077.png"
              alt="Patient Avatar"
              className="rounded-circle border border-3 border-primary me-md-4 mb-3 mb-md-0"
              width="120"
              height="120"
            />
            <div>
              <h2 className="text-primary fw-bold mb-1">{patient.name}</h2>
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
                {/* <button className="btn btn-danger w-100 mb-2" onClick={handleDelete}>🗑️ Delete Patient</button> */}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - TAB BASED DETAILS */}
          <div className="col-lg-8">
            <Tabs defaultActiveKey="description" id="patient-tabs" className="mb-3" fill>
              <Tab eventKey="description" title="Description">
                <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: "15px" }}>
                  <div className="card-body">{renderList(patient.patientDescription)}</div>
                </div>
              </Tab>

              <Tab eventKey="general" title="General Exam">
                <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: "15px" }}>
                  <div className="card-body">{renderList(patient.generalExamination)}</div>
                </div>
              </Tab>

              <Tab eventKey="systemic" title="Systemic Exam">
                <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: "15px" }}>
                  <div className="card-body">{renderList(patient.systemicExamination)}</div>
                </div>
              </Tab>

              <Tab eventKey="history" title="Medical History">
                <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: "15px" }}>
                  <div className="card-body">
                    {patient.history ? (
                      <>
                        {patient.history.chiefComplaint && <p><strong>Chief Complaint:</strong> {patient.history.chiefComplaint}</p>}
                        {patient.history.pastHistory && <p><strong>Past:</strong> {patient.history.pastHistory}</p>}
                        {patient.history.familyHistory && <p><strong>Family:</strong> {patient.history.familyHistory}</p>}
                        {patient.history.surgeryHistory && <p><strong>Surgery:</strong> {patient.history.surgeryHistory}</p>}
                        {patient.history.treatmentHistory && <p><strong>Treatment:</strong> {patient.history.treatmentHistory}</p>}

                        <h6 className="fw-bold text-secondary mt-3">Personal History</h6>
                        {renderList(patient.history.personalHistory)}
                      </>
                    ) : (
                      <p className="text-center text-muted fst-italic">No Data Available</p>
                    )}
                  </div>
                </div>
              </Tab>

              <Tab eventKey="vitals" title="Vital Signs">
                <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: "15px" }}>
                  <div className="card-body">{renderList(patient.vitalSigns)}</div>
                </div>
              </Tab>

              <Tab eventKey="diagnosis" title="Diagnosis">
                <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: "15px" }}>
                  <div className="card-body">{renderList(patient.diagnosisDetails)}</div>
                </div>
              </Tab>

              <Tab eventKey="reports" title="Reports">
                <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: "15px" }}>
                  <div className="card-body">
                    {renderArray(patient.reports, (report, index) => (
                      <div key={index} className="mb-3 p-3 border rounded bg-light">
                        {report.reportType && <p className="mb-1"><strong>{report.reportType}:</strong> {report.description}</p>}
                        {report.fileUrl && <a href={report.fileUrl} target="_blank" rel="noopener noreferrer">🔗 View Report</a>}
                      </div>
                    ))}
                  </div>
                </div>
              </Tab>

              <Tab eventKey="treatments" title="Treatments">
                <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: "15px" }}>
                  <div className="card-body">
                    {renderArray(patient.treatments, (t, index) => (
                      <div key={index} className="border rounded p-3 mb-2 bg-light">
                        {t.medicineName && <p><strong>Medicine:</strong> {t.medicineName}</p>}
                        {t.amount && <p><strong>Amount:</strong> {t.amount}</p>}
                        {t.days && <p><strong>Days:</strong> {t.days}</p>}
                        {t.beforeCondition && <p><strong>Before Condition:</strong> {t.beforeCondition}</p>}
                        {t.afterCondition && <p><strong>After Condition:</strong> {t.afterCondition}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </Tab>

              <Tab eventKey="prescription" title="Prescription">
                <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: "15px" }}>
                  <div className="card-body">{renderList(patient.prescription)}</div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientView;
