import React, { useEffect, useState } from "react";
import SidebarPatient from "../../components/Patients/SidebarPatient";
import { getPatientById } from "../../services/patientService";
import { useParams } from "react-router-dom";

export default function PatientTreatments() {

  const {id} = useParams();
  const [patient, setPatient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const treatmentsPerPage = 10;

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        // Get patient ID from localStorage or wherever stored
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const patientId = storedUser?.data?.id || storedUser?.id;

        const data = await getPatientById(id); // fetch latest data from backend
        console.log("Fetched Patient Treatments:", data);
        setPatient(data); // now includes updated treatments
      } catch (e) {
        console.error("Error fetching patient:", e);
      }
    };

    fetchPatient();
  }, [patient?.treatments.id]);

  if (!patient) return <p className="p-4">Loading...</p>;

  // Sort treatments by latest first
  const sortedTreatments = [...(patient.treatments || [])].sort((a, b) => {
    const dateA = new Date(a.date || a.createdAt || 0);
    const dateB = new Date(b.date || b.createdAt || 0);
    return dateB - dateA;
  });

  const indexOfLast = currentPage * treatmentsPerPage;
  const indexOfFirst = indexOfLast - treatmentsPerPage;
  const currentTreatments = sortedTreatments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedTreatments.length / treatmentsPerPage);

  return (
    <div className="d-flex flex-column flex-md-row min-vh-100">
      <SidebarPatient patient={patient} />

      <div className="p-4 flex-grow-1 bg-light w-100">
        <h2 className="text-success">💊 My Treatments</h2>
        <hr />
        {sortedTreatments.length === 0 ? (
          <p className="text-muted mt-3">No treatments uploaded yet.</p>
        ) : (
          <>
            <div className="row g-4 mt-3">
              {currentTreatments.map((treatment, index) => (
                <div className="col-12 col-md-6 col-lg-4" key={index}>
                  <div className="card shadow-sm p-3 h-100">
                    <h5>{treatment.medicineName || `Treatment #${index + 1}`}</h5>
                    <p><strong>Amount:</strong> {treatment.amount}</p>
                    <p><strong>Days:</strong> {treatment.days}</p>
                    <p><strong>Before Condition:</strong> {treatment.beforeCondition}</p>
                    <p><strong>After Condition:</strong> {treatment.afterCondition}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                {[...Array(totalPages)].map((_, i) => (
                  <li
                    key={i}
                    className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        )}
      </div>
    </div>
  );
}
