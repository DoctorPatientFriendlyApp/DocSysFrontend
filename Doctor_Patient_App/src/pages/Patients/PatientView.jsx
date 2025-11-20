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
            {patient.socialEconomicalStatus && ( <p> <strong>Social Economical Status:</strong>{" "}{patient.socialEconomicalStatus} </p>
            )}
            {patient.zodiacSign && <p><strong>Zodiac Sign:</strong> {patient.zodiacSign}</p>}
          </div>

        <hr />
          
          {/* Patient Description */}
           {patient.patientDescription &&(
            <>
              <div className='text-start px-4'>
                <h5 className="text-success mt-3 mb-2"> Patinent Description </h5>
                 <ul>
                   <li> <strong> Breast : </strong> {patient.patientDescription.breast} </li>
                   <li> <strong> Ears :</strong> {patient.patientDescription.ears} </li>
                   <li> <strong> Eyes : </strong> {patient.patientDescription.eyes} </li>
                   <li> <strong> Hair : </strong> {patient.patientDescription.hair} </li>
                   <li> <strong> Head :</strong> {patient.patientDescription.head} </li>
                   <li> <strong> Hearing : </strong> {patient.patientDescription.hearing} </li>
                    <li> <strong> Nails : </strong> {patient.patientDescription.nails} </li>
                   <li> <strong> Nose :</strong> {patient.patientDescription.nose} </li>
                   <li> <strong> Sensation : </strong> {patient.patientDescription.sensation} </li>
                    <li> <strong> Skin : </strong> {patient.patientDescription.skin} </li> 
                   <li> <strong> Smell : </strong> {patient.patientDescription.smell} </li>
                    <li> <strong> Taste : </strong> {patient.patientDescription.taste} </li>
                   <li> <strong> Tongue :</strong> {patient.patientDescription.tongue} </li>
                   <li> <strong> Vision : </strong> {patient.patientDescription.vision} </li>
                 </ul>
              </div>
            </>
           )}
          
          <hr />

          {/* generalExamination */}

          {patient.generalExamination && (
            <>
             <div className='text-start px-4'>
                 <h5 className="text-success mt-3 mb-2"> Patinent GeneralExamination </h5>
                 <ul>
                   <li> <strong> build : </strong> {patient.generalExamination.build} </li>
                   <li> <strong> clubbing :</strong> {patient.generalExamination.clubbing} </li>
                   <li> <strong> cyanosis : </strong> {patient.generalExamination.cyanosis} </li>
                   <li> <strong> edema : </strong> {patient.generalExamination.edema} </li>
                   <li> <strong> gait :</strong> {patient.generalExamination.gait} </li>
                   <li> <strong> height : </strong> {patient.generalExamination.height} </li>
                    <li> <strong> icterus : </strong> {patient.generalExamination.icterus} </li>
                   <li> <strong> nourishment :</strong> {patient.generalExamination.nourishment} </li>
                   <li> <strong> weight : </strong> {patient.generalExamination.weight} </li>
              
                 </ul>
              </div>
                
            </>)}


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
                    <li><strong>Appetite:</strong> {patient.history.personalHistory.appetite}</li>
                    <li><strong>Diet:</strong> {patient.history.personalHistory.diet}</li>
                    <li><strong>Aversion:</strong> {patient.history.personalHistory.aversion}</li>
                    <li><strong> Bowel : </strong> {patient.history.personalHistory.bowel} </li>
                    <li><strong>Desired Food:</strong> {patient.history.personalHistory.desiredFood}</li>
                    <li><strong>Dreams : </strong> {patient.history.personalHistory.dreams} </li>
                    <li><strong>Thirst:</strong> {patient.history.personalHistory.thirst}</li>
                    <li><strong>Sleep:</strong> {patient.history.personalHistory.sleep}</li>
                    <li><strong> ExtraMaritalHistory:</strong> {patient.history.personalHistory.extraMaritalHistory}</li>
                    <li><strong>Habits:</strong> {patient.history.personalHistory.habits}</li>
                    <li><strong>Masturbation Per Month:</strong> {patient.history.personalHistory.masturbationPerMonth}</li>
                    <li><strong>Masturbation Per Week:</strong> {patient.history.personalHistory.masturbationPerWeek}</li>
                    <li><strong> Menstrual History:</strong> {patient.history.personalHistory.menstrualHistory}</li>
                    <li><strong> Micturition Per Day:</strong> {patient.history.personalHistory.micturitionPerDay}</li>
                    <li><strong> Micturition Per Night:</strong> {patient.history.personalHistory.micturitionPerNight}</li>
                    <li><strong> Obstetric History:</strong> {patient.history.personalHistory.obstetricHistory}</li>
                    <li><strong> personal Sexual History:</strong> {patient.history.personalHistory.personalSexualHistory}</li>
                    <li><strong> Perspiration :</strong> {patient.history.personalHistory.perspiration}</li>
                  </ul>
                </div>
              )}
            </div>
          )}

           <hr />
          {/* Systemic Examination  */}
          {patient.systemicExamination &&(<> 
              
              <div className="text-start px-4 mt-4"> 
                     <h6 className="mt-2"> Systemic Examination  </h6>
                     <ul>

                        <li> <strong> RespiratoryAuscultation</strong> : {patient.systemicExamination.respiratoryAuscultation} </li>
                        <li> <strong> RespiratoryInspection</strong> : {patient.systemicExamination.respiratoryInspection} </li>
                        <li> <strong> RespiratoryPalpation</strong> : {patient.systemicExamination.respiratoryPalpation} </li>
                        <li> <strong> RespiratoryPercussion</strong> : {patient.systemicExamination.respiratoryPercussion} </li>
                                

                       <li> <strong> AbdomenAuscultation</strong> : {patient.systemicExamination.abdomenAuscultation} </li>
                       <li> <strong> AbdomenInspection</strong> : {patient.systemicExamination.abdomenInspection} </li>
                       <li> <strong> AbdomenPalpation</strong> : {patient.systemicExamination.abdomenPalpation} </li>
                       <li> <strong> AbdomenPercussion</strong> : {patient.systemicExamination.abdomenPercussion} </li>
                      
                      <li> <strong> CVS Auscultation</strong> : {patient.systemicExamination.cvsAuscultation} </li>
                      <li> <strong> CVS Inspection</strong> : {patient.systemicExamination.cvsInspection} </li>
                      <li> <strong> CVS Palpation</strong> : {patient.systemicExamination.cvsPalpation} </li>
                     <li> <strong> CVS Percussion</strong> : {patient.systemicExamination.cvsPercussion} </li>

                     <li> <strong> Cranial Reflexes</strong> : {patient.systemicExamination.cranialReflexes} </li>
                     <li> <strong> Motor Reflexes</strong> : {patient.systemicExamination.motorReflexes} </li> 
                     <li> <strong> Peripheral Reflexes</strong> : {patient.systemicExamination.peripheralReflexes} </li>
                     </ul>
              </div>

          </>)}
 
        <hr />

      {patient.vitalSigns && (<>
   
             <div className="text-start px-4 mt-4">
              <h5 className="text-primary mb-2">Vital Signs</h5>
              <ul>
                <li><strong> Blood Pressure : </strong> {patient.vitalSigns.bloodPressure}</li>
                <li><strong> Pulse Rate : </strong> {patient.vitalSigns.pulseRate}</li>
                <li><strong> Respiration Rate : </strong> {patient.vitalSigns.respirationRate}</li>
                <li><strong> Temperature : </strong> {patient.vitalSigns.temperature}</li>
              
              </ul> 
             </div>

          </>)}

        <hr />

         {patient.diagnosisDetails && (<>
           
             <div className="text-start px-4 mt-4">
              <h5 className="text-primary mb-2"> Diagnosis Details </h5>
               <ul>
                  <li><strong> Differential Diagnosis : </strong> {patient.diagnosisDetails.differentialDiagnosis} </li>
                  <li><strong> FinalDiagnosis : </strong> {patient.diagnosisDetails.finalDiagnosis} </li>
                  <li><strong> Hahnemannian Disease Classification : </strong> {patient.diagnosisDetails.hahnemannianDiseaseClassification} </li>
                  <li><strong> Miasma : </strong> {patient.diagnosisDetails.miasma} </li>
                  <li><strong> Investigation Advice : </strong> {patient.diagnosisDetails.investigationAdvice} </li>
                  <li><strong> Provisional Diagnosis : </strong> {patient.diagnosisDetails.provisionalDiagnosis} </li>
                  <li><strong> Why Choose this Medicine : </strong> {patient.diagnosisDetails.reasonForChoosingMedicine} </li>
                <li> <strong> Repertory Used : </strong> {patient.diagnosisDetails.repertoryUsed} </li>
               </ul>
        
             </div>
         </>)}

        <hr />

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

          {/* Prescription Section */}
         {patient.prescription && (
             <>
               <div className="text-start px-4 mt-4">
                <h5 className="text-danger mb-2">💊 Prescription</h5  >
                <ul>
                  <li> <strong> Advice : </strong> {patient.prescription.advice} </li>
                  <li> <strong> FollowUp :</strong> {patient.prescription.followUp} </li>
                  <li> <strong> Remedy With Potency : </strong> {patient.prescription.remedyWithPotency} </li>
                  <li> <strong> Repetition : </strong> {patient.prescription.repetition} </li>
                  
                </ul>
              </div>
             </>
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
