import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPatientById, updatePatient } from "../../services/patientService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PatientEdit.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // important for tabs



function PatientEdit() {
  const { id } = useParams();
  console.log(" Patient Id  edit: " + id)
  const navigate = useNavigate();

  const [patient, setPatient] = useState({
    name: "",
    age: "",
    sex: "",
    mobile: "",
    email: "",
    bloodGroup: "",
    dob: "",
    address: "",
    socialEconomicalStatus: "",

    history: {
      chiefComplaint: "",
      pastHistory: "",
      familyHistory: "",
      surgeryHistory: "",
      treatmentHistory: "",
      personalHistory: {
        diet: "",
        appetite: "",
        desiredFood: "",
        aversion: "",
        thirst: "",
        sleep: "",
      },
    },

    reports: [],
    treatments: [],

    patientDescription: {
      breast: "",
      ears: "",
      eyes: "",
      hair: "",
      head: "",
      hearing: "",
      nails: "",
      nose: "",
      sensation: "",
      skin: "",
      smell: "",
      taste: "",
      tongue: "",
      vision: "",
    },

    generalExamination: {
      build: "",
      clubbing: "",
      cyanosis: "",
      edema: "",
      gait: "",
      height: "",
      icterus: "",
      nourishment: "",
      weight: "",
    },

    systemicExamination: {
      respiratoryAuscultation: "",
      respiratoryInspection: "",
      respiratoryPalpation: "",
      respiratoryPercussion: "",
      abdomenAuscultation: "",
      abdomenInspection: "",
      abdomenPalpation: "",
      abdomenPercussion: "",
      cvsAuscultation: "",
      cvsInspection: "",
      cvsPalpation: "",
      cvsPercussion: "",
      cranialReflexes: "",
      motorReflexes: "",
      peripheralReflexes: "",
    },

    vitalSigns: {
      bloodPressure: "",
      pulseRate: "",
      respirationRate: "",
      temperature: "",
    },

    diagnosisDetails: {
      differentialDiagnosis: "",
      finalDiagnosis: "",
      hahnemannianDiseaseClassification: "",
      miasma: "",
      investigationAdvice: "",
      provisionalDiagnosis: "",
      reasonForChoosingMedicine: "",
      repertoryUsed: "",
    },

    prescription: {
      advice: "",
      followUp: "",
      remedyWithPotency: "",
      repetition: "",
    },
  });

  useEffect(() => {
    fetchPatient();
  }, []);

  // --------------------------------------------------
  //  Even there is no Data still it should show empty spaces so, fetch only empty spaces 
const fetchPatient = async () => {
  try {
    const data = await getPatientById(id); 
    setPatient((prev) => ({
      ...prev, // keep default fields
      ...data, // overwrite only top-level fields like name, age, email
      history: {
        ...prev.history,
        ...(data?.history || {}),
        personalHistory: {
          ...prev.history.personalHistory,
          ...(data?.history?.personalHistory || {}),
        },
      },
      patientDescription: {
        ...prev.patientDescription,
        ...(data?.patientDescription || {}),
      },
      generalExamination: {
        ...prev.generalExamination,
        ...(data?.generalExamination || {}),
      },
      systemicExamination: {
        ...prev.systemicExamination,
        ...(data?.systemicExamination || {}),
      },
      vitalSigns: {
        ...prev.vitalSigns,
        ...(data?.vitalSigns || {}),
      },
      diagnosisDetails: {
        ...prev.diagnosisDetails,
        ...(data?.diagnosisDetails || {}),
      },
      prescription: {
        ...prev.prescription,
        ...(data?.prescription || {}),
      },
      reports: data?.reports || prev.reports,
      treatments: data?.treatments || prev.treatments,
    }));
  } catch (error) {
    toast.error("Error fetching patient data");
    console.error(error);
  }
};
// --------------------------------------------------------------
  // ----- Handlers (same as before) -----
  const handleChange = (e) =>
    setPatient({ ...patient, [e.target.name]: e.target.value });

  const handleHistoryChange = (e) =>
    setPatient({
      ...patient,
      history: { ...patient.history, [e.target.name]: e.target.value },
    });

  const handlePersonalHistoryChange = (e) =>
    setPatient({
      ...patient,
      history: {
        ...patient.history,
        personalHistory: {
          ...patient.history.personalHistory,
          [e.target.name]: e.target.value,
        },
      },
    });

  const handleReportChange = (i, field, value) => {
    const updated = [...patient.reports];
    updated[i] = { ...updated[i], [field]: value };
    setPatient({ ...patient, reports: updated });
  };

  const handleAddReport = () =>
    setPatient({
      ...patient,
      reports: [
        ...patient.reports,
        { reportDate: "", reportType: "", description: "", notes: "", fileUrl: "" },
      ],
    });

  const handleDeleteReport = (i) =>
    setPatient({
      ...patient,
      reports: patient.reports.filter((_, idx) => idx !== i),
    });

  const handleTreatmentChange = (i, field, value) => {
    const updated = [...patient.treatments];
    if (field === "amount") value = value === "" ? 0 : parseFloat(value);
    if (field === "days") value = value === "" ? 0 : parseInt(value);
    updated[i][field] = value;
    setPatient({ ...patient, treatments: updated });
  };

  const handleAddTreatment = () =>
    setPatient({
      ...patient,
      treatments: [
        ...patient.treatments,
        {
          medicineName: "",
          amount: 0.0,
          days: 0,
          beforeCondition: "",
          afterCondition: "",
        },
      ],
    });

  const handleDeleteTreatment = (i) =>
    setPatient({
      ...patient,
      treatments: patient.treatments.filter((_, idx) => idx !== i),
    });

  const handlePatientDescriptionChange = (e) =>
    setPatient({
      ...patient,
      patientDescription: {
        ...patient.patientDescription,
        [e.target.name]: e.target.value,
      },
    });

  const handleGeneralExaminationChange = (e) =>
    setPatient({
      ...patient,
      generalExamination: {
        ...patient.generalExamination,
        [e.target.name]: e.target.value,
      },
    });

  const handleSystemicExamChange = (e) =>
    setPatient({
      ...patient,
      systemicExamination: {
        ...patient.systemicExamination,
        [e.target.name]: e.target.value,
      },
    });

  const handleVitalsChange = (e) =>
    setPatient({
      ...patient,
      vitalSigns: {
        ...patient.vitalSigns,
        [e.target.name]: e.target.value,
      },
    });

  const handleDiagnosisChange = (e) =>
    setPatient({
      ...patient,
      diagnosisDetails: {
        ...patient.diagnosisDetails,
        [e.target.name]: e.target.value,
      },
    });

  const handlePrescriptionChange = (e) =>
    setPatient({
      ...patient,
      prescription: {
        ...patient.prescription,
        [e.target.name]: e.target.value,
      },
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
   const response= await updatePatient(id, patient);
    console.log("Updated Patient:"+ response);
      toast.success("Patient details updated successfully!");
      navigate(`/patients/view/${id}`);

    } catch (error) {
      toast.error("Failed to update patient");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center text-primary mb-4">🏥 Update Patient Details</h2>

      <form onSubmit={handleSubmit} className="animate-fade">

        {/* Tabs Navigation */}
        <ul className="nav nav-tabs mb-3" id="patientTab" role="tablist">
          {[
            ["Basic Info", "basicInfo"],
            ["Patient Description", "patientDesc"],
            ["Medical History", "history"],
            ["Examinations", "exam"],
            ["Vitals", "vitals"],
            ["Diagnosis", "diagnosis"],
            ["Reports", "reports"],
            ["Treatments", "treatments"],
            ["Prescription", "prescription"],
          ].map(([label, id], index) => (
            <li className="nav-item" key={id}>
              <button
                className={`nav-link ${index === 0 ? "active" : ""}`}
                id={`${id}-tab`}
                data-bs-toggle="tab"
                data-bs-target={`#${id}`}
                type="button"
                role="tab"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <div className="tab-content">
          {/* ----- Basic Info ----- */}
          <div className="tab-pane fade show active" id="basicInfo" role="tabpanel">
            <div className="card p-3 mb-3 shadow-sm">
              <div className="row">
                {[
                  ["Name", "name"],
                  ["Age", "age", "number"],
                  ["Sex", "sex", "select"],
                  ["Mobile", "mobile"],
                  ["Email", "email"],
                  ["Blood Group", "bloodGroup"],
                  ["Address", "address"],
                ].map(([label, field, type = "text"]) => (
                  <div className="col-md-6 mb-3" key={field}>
                    <label className="form-label">{label}</label>
                    {type === "select" ? (
                      <select
                        className="form-select"
                        name={field}
                        value={patient[field] || ""}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                      </select>
                    ) : (
                      <input
                        type={type}
                        className="form-control"
                        name={field}
                        value={patient[field] || ""}
                        onChange={handleChange}
                      />
                    )}
                  </div>
                ))}
              </div>

           
            </div>
          </div>

          {/* ----- Patient Description ----- */}
          <div className="tab-pane fade" id="patientDesc" role="tabpanel">
            <div className="card p-3 mb-3 shadow-sm row">
              {/* Optional Fallback when we dont have Data then it should render empty spaces  */}
              {Object.keys(patient.patientDescription || {}).map((field) => (
                <div className="col-md-4 mb-3" key={field}>
                  <label className="form-label text-capitalize">{field}</label>
                  <input
                    className="form-control"
                    name={field}
                    value={patient.patientDescription[field]}
                    onChange={handlePatientDescriptionChange}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ----- Medical History ----- */}
          <div className="tab-pane fade" id="history" role="tabpanel">
            <div className="card p-3 mb-3 shadow-sm">
              {["chiefComplaint", "pastHistory", "familyHistory", "surgeryHistory", "treatmentHistory"].map(
                (field) => (
                  <div key={field} className="mb-3">
                    <label className="form-label">{field.replace(/([A-Z])/g, " $1")}</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      name={field}
                      value={patient.history?.[field] || ""}
                      onChange={handleHistoryChange}
                    />
                  </div>
                )
              )}

              <h6 className="text-primary fw-bold mt-3">Personal History</h6>
              <div className="row">
                {["diet", "appetite", "desiredFood", "aversion", "thirst", "sleep"].map((field) => (
                  <div className="col-md-4 mb-3" key={field}>
                    <label className="form-label">{field}</label>
                    <input
                      className="form-control"
                      name={field}
                      value={patient.history.personalHistory[field]}
                      onChange={handlePersonalHistoryChange}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ----- Examinations ----- */}
          <div className="tab-pane fade" id="exam" role="tabpanel">
            <div className="card p-3 mb-3 shadow-sm">
              <h6 className="text-success fw-bold">General Examination</h6>
              <div className="row">    
                                                    {/* FallBack */}
                {Object.keys(patient.generalExamination || {}).map((field) => (
                  <div className="col-md-4 mb-3" key={field}>
                    <label className="form-label">{field}</label>
                    <input
                      className="form-control"
                      name={field}
                      value={patient.generalExamination[field]}
                      onChange={handleGeneralExaminationChange}
                    />
                  </div>
                ))}
              </div>

              <h6 className="text-warning fw-bold mt-3">Systemic Examination</h6>
              <div className="row">
                {Object.keys(patient.systemicExamination || {}).map((field) => (
                  <div className="col-md-4 mb-3" key={field}>
                    <label className="form-label">{field}</label>
                    <input
                      className="form-control"
                      name={field}
                      value={patient.systemicExamination[field]}
                      onChange={handleSystemicExamChange}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ----- Vitals ----- */}
          <div className="tab-pane fade" id="vitals" role="tabpanel">
            <div className="card p-3 mb-3 shadow-sm row">
              {Object.keys(patient.vitalSigns || {}).map((field) => (
                <div className="col-md-3 mb-3" key={field}>
                  <label className="form-label">{field}</label>
                  <input
                    className="form-control"
                    name={field}
                    value={patient.vitalSigns[field]}
                    onChange={handleVitalsChange}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ----- Diagnosis ----- */}
          <div className="tab-pane fade" id="diagnosis" role="tabpanel">
            <div className="card p-3 mb-3 shadow-sm">
              {Object.keys(patient.diagnosisDetails || {}).map((field) => (
                <div className="mb-3" key={field}>
                  <label className="form-label">{field}</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    name={field}
                    value={patient.diagnosisDetails[field]}
                    onChange={handleDiagnosisChange}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ----- Reports ----- */}
          <div className="tab-pane fade" id="reports" role="tabpanel">
            <div className="card p-3 mb-3 shadow-sm">
              <button type="button" className="btn btn-primary btn-sm mb-2" onClick={handleAddReport}>
                ➕ Add Report
              </button>
              {patient.reports.length > 0 ? (
                patient.reports.map((r, i) => (
                  <div key={i} className="border rounded p-3 mb-2 bg-light shadow-sm">
                    <div className="d-flex justify-content-between mb-2">
                      <strong>Report #{i + 1}</strong>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteReport(i)}>Delete</button>
                    </div>
                    <input type="date" className="form-control mb-2" value={r.reportDate} onChange={(e) => handleReportChange(i, "reportDate", e.target.value)} />
                    <input className="form-control mb-2" value={r.reportType} onChange={(e) => handleReportChange(i, "reportType", e.target.value)} placeholder="Report Type" />
                    <textarea className="form-control mb-2" rows="2" value={r.description} onChange={(e) => handleReportChange(i, "description", e.target.value)}  placeholder="Desciption"/>
                    <input className="form-control mb-2" value={r.notes} onChange={(e) => handleReportChange(i, "notes", e.target.value)} placeholder="Notes or Tips"/>
                    <label> Add Report File  </label> 
                    <input className="form-control" type="file"
                           onChange={(e) => handleReportChange(i, "file", e.target.files[0])} 
                           placeholder="Add Report File "/>

                  </div>
                ))
              ) : (
                <p className="text-muted">No reports added yet.</p>
              )}
            </div>
          </div>

          {/* ----- Treatments ----- */}
          <div className="tab-pane fade" id="treatments" role="tabpanel">
            <div className="card p-3 mb-3 shadow-sm">
              <button type="button" className="btn btn-primary btn-sm mb-2" onClick={handleAddTreatment}>
                ➕ Add Treatment
              </button>
              {patient.treatments.length > 0 ? (
                patient.treatments.map((t, i) => (
                  <div key={i} className="border rounded p-3 mb-2 bg-light shadow-sm">
                    <div className="d-flex justify-content-between mb-2">
                      <strong>Treatment #{i + 1}</strong>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTreatment(i)}>Delete</button>
                    </div>
                   {/* Treatment Fields */}
                    {["medicineName", "amount", "days", "beforeCondition", "afterCondition"].map((field) => (
                      <input
                        key={field}
                        type={field === "amount" || field === "days" ? "number" : "text"}  // If the field is "amount" or "days", it uses <input type="number" />.,, Otherwise, <input type="text" />.
                        className="form-control mb-2"
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={t[field] || ""}  //t[field] is the value of this treatment’s field OR || "" ensures React doesn’t complain if the value is undefined.
                        onChange={(e) => handleTreatmentChange(i, field, e.target.value)}
                      />
                    ))}
                  </div>
                ))
              ) : (
                <p className="text-muted">No treatments added yet.</p>
              )}
            </div>
          </div>

          {/* ----- Prescription ----- */}
          <div className="tab-pane fade" id="prescription" role="tabpanel">
            <div className="card p-3 mb-3 shadow-sm">
              {Object.keys(patient.prescription || {}).map((field) => (
                <div className="mb-3" key={field}>
                  <label className="form-label">{field}</label>
                  <input className="form-control" name={field} value={patient.prescription[field]} onChange={handlePrescriptionChange} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="text-center my-4">
          <button className="btn btn-success btn-lg px-5 me-3">💾 Save</button>
          <Link to={`/patients/view/${id}`} className="btn btn-outline-secondary btn-lg px-5">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

export default PatientEdit;
