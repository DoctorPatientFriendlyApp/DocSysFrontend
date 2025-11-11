import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPatientById, updatePatient } from "../../services/patientService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PatientEdit() {
  const { id } = useParams();
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
    history: {
      currentHistory: "",
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
  });

  useEffect(() => {
    fetchPatient();
  }, []);

  const fetchPatient = async () => {
    try {
      const data = await getPatientById(id);
      setPatient({
        ...patient,
        ...data,
        history: data.history || patient.history,
        reports: data.reports || [],
        treatments: data.treatments || [],
      });
    } catch (error) {
      toast.error("Error fetching patient data");
      console.error(error);
    }
  };

  // ----- Basic Handlers -----
  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleHistoryChange = (e) => {
    const { name, value } = e.target;
    setPatient({
      ...patient,
      history: { ...patient.history, [name]: value },
    });
  };

  const handlePersonalHistoryChange = (e) => {
    const { name, value } = e.target;
    setPatient({
      ...patient,
      history: {
        ...patient.history,
        personalHistory: {
          ...patient.history.personalHistory,
          [name]: value,
        },
      },
    });
  };

  // ----- Report Handlers -----
 const handleReportChange = (index, field, value) => {
  const updatedReports = [...patient.reports];
  updatedReports[index] = { ...updatedReports[index], [field]: value };
  setPatient({ ...patient, reports: updatedReports });
};


const handleAddReport = () => {
  const newReport = {
    reportDate: "",
    reportType: "",
    description: "",
    notes: "",
    fileUrl: "",
  };
  setPatient({ ...patient, reports: [...patient.reports, newReport] });
};

  const handleDeleteReport = (index) => {
    const updatedReports = patient.reports.filter((_, i) => i !== index);
    setPatient({ ...patient, reports: updatedReports });
  };

  // ----- Treatment Handlers ----- // handle both number as well as String inputs
  const handleTreatmentChange = (index, field, value) => {
  const updatedTreatments = [...patient.treatments];

  // Convert amount & days to number
  if (field === "amount") {
    updatedTreatments[index][field] = value === "" ? 0 : parseFloat(value);
  } else if (field === "days") {
    updatedTreatments[index][field] = value === "" ? 0 : parseInt(value);
  } else {
    updatedTreatments[index][field] = value;
  }

  setPatient({ ...patient, treatments: updatedTreatments });
};


  const handleAddTreatment = () => {
    const newTreatment = {
      medicineName: "",
      amount: 0.0,// initialize as number
      days: 0,
      beforeCondition: "",
      afterCondition: "",
    };
    setPatient({ ...patient, treatments: [...patient.treatments, newTreatment] });
  };

  const handleDeleteTreatment = (index) => {
    const updatedTreatments = patient.treatments.filter((_, i) => i !== index);
    setPatient({ ...patient, treatments: updatedTreatments });
  };

  // ----- Submit -----
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePatient(id, patient);
      toast.success("Patient details updated successfully!");
      navigate("/patients");
    } catch (error) {
      console.error("Error updating patient:", error);
      toast.error("Failed to update patient");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center text-success">✏️ Edit Patient Details</h2>

      <form onSubmit={handleSubmit}>
        {/* BASIC DETAILS */}
        <div className="card p-3 shadow-sm mb-4">
          <h5>Basic Information</h5>
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

        {/* MEDICAL HISTORY */}
        <div className="card p-3 shadow-sm mb-4">
          <h5>🩺 Medical History</h5>
          {["currentHistory", "pastHistory", "familyHistory", "surgeryHistory", "treatmentHistory"].map((field) => (
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
          ))}

          <h6 className="mt-3">Personal History</h6>
          {["diet", "appetite", "desiredFood", "aversion", "thirst", "sleep"].map((field) => (
            <div key={field} className="mb-3">
              <label className="form-label">{field.replace(/([A-Z])/g, " $1")}</label>
              <input
                className="form-control"
                name={field}
                value={patient.history?.personalHistory?.[field] || ""}
                onChange={handlePersonalHistoryChange}
              />
            </div>
          ))}
        </div>

        {/* REPORTS */}
        <div className="card p-3 shadow-sm mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5>📋 Reports</h5>
            <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleAddReport}>
              ➕ Add New Report
            </button>
          </div>

          {patient.reports.length > 0 ? (
            patient.reports.map((r, i) => (
              <div key={i} className="border rounded p-2 mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <strong>Report #{i + 1}</strong>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteReport(i)}
                  >
                    🗑 Delete
                  </button>
                </div>
                 <input
                  type="date"
                  className="form-control mb-2"
                  value={r.reportDate || ""}
                  onChange={(e) => handleReportChange(i, "reportDate", e.target.value)}
                   placeholder="Report Date"
                />
                <input
                  className="form-control mb-2 mt-2"
                  value={r.reportType || ""}
                  onChange={(e) => handleReportChange(i, "reportType", e.target.value)}
                  placeholder="Report Type"
                />
                <textarea
                  className="form-control mb-2"
                  rows="2"
                  value={r.description || ""}
                  onChange={(e) => handleReportChange(i, "description", e.target.value)}
                  placeholder="Description"
                />
                <input
                  className="form-control mb-2"
                  value={r.notes || ""}
                  onChange={(e) => handleReportChange(i, "notes", e.target.value)}
                  placeholder="Notes"
                />
                <input 
                   className="form-control mb-2" 
                   type="file"
                   onChange={(e) => handleReportChange(i, "fileUrl", e.target.files[0])}
                />
              </div>
            ))
          ) : (
            <p>No reports available.</p>
          )}
        </div>

        {/* TREATMENTS */}
        <div className="card p-3 shadow-sm mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5>💊 Treatments</h5>
            <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleAddTreatment}>
              ➕ Add New Treatment
            </button>
          </div>

          {patient.treatments.length > 0 ? (
            patient.treatments.map((t, i) => (
              <div key={i} className="border rounded p-2 mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <strong>Treatment #{i + 1}</strong>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteTreatment(i)}
                  >
                    🗑 Delete
                  </button>
                </div>

               {["medicineName", "amount", "days", "beforeCondition", "afterCondition"].map((field) => (
                <input  key={field}
                        type={field === "amount" || field === "days" ? "number" : "text"} // ✅ number for amount & days
                        className="form-control mb-2 mt-2"
                        value={t[field] || ""}
                        onChange={(e) => {
                         // Convert number fields to string temporarily
                        const value = e.target.value;
                        handleTreatmentChange(i, field, value);
                   }}
                       placeholder={field.replace(/([A-Z])/g, " $1")}
                   />
                ))}

              </div>
            ))
          ) : (
            <p>No treatments available.</p>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="d-flex justify-content-center gap-3 mt-3">
          <button type="submit" className="btn btn-success px-4">
            💾 Save Changes
          </button>
          <Link to="/patients" className="btn btn-secondary px-4">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default PatientEdit;
