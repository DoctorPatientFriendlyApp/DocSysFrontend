import React, { use, useEffect, useState } from "react";
import SidebarPatient from "../../components/Patients/SidebarPatient";
import { getPatientById } from "../../services/patientService";
import { useParams } from "react-router-dom";

export default function PatientReports() {
   const {id } = useParams();
  const [patient, setPatient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 10; // Show 10 report  s per page

  // SIDEBAR STATE
 // Sidebar Toggle State
   const [showSidebar, setShowSidebar] = useState(false);
   const toggleSidebar = () => setShowSidebar(!showSidebar);


  // Fetch patient info from localStorage on component mount
useEffect(() => {
  const fetchPatient = async () => {
    try {

      console.log("Patient ID:",id);

      const data = await getPatientById(id);
      console.log("Fetched patient data (Patients Report):", data);
      setPatient(data); // this now has updated reports
    } catch (err) {
      console.error("Error fetching patient:", err);
    }
  };

  fetchPatient();
}, []);



  if (!patient) return <p className="p-4">Loading...</p>;

  // Sort reports by latest first (descending by reportDate or createdAt)
  const sortedReports = [...(patient.reports || [])].sort((a, b) => {
    const dateA = a.reportDate || a.createdAt;
    const dateB = b.reportDate || b.createdAt;

    // Convert YYYY-MM-DD string to timestamp safely
    const tsA = dateA ? new Date(dateA).getTime() : 0;
    const tsB = dateB ? new Date(dateB).getTime() : 0;

    return tsB - tsA;
  });

  // Pagination logic
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = sortedReports.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(sortedReports.length / reportsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Function to safely format report dates
  const formatDate = (dateStr) => {
    if (!dateStr) return "Unknown";

    // If dateStr is YYYY-MM-DD
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const [year, month, day] = parts;
      const dateObj = new Date(year, month - 1, day);
      return isNaN(dateObj.getTime()) ? "Unknown" : dateObj.toLocaleDateString();
    }

    // Fallback
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? "Unknown" : parsed.toLocaleDateString();
  };

  return (
    <div className="d-flex flex-column flex-md-row min-vh-100">

       {/* OFFCANVAS SIDEBAR */}
           <SidebarPatient
             patient={patient}
             show={showSidebar}
             handleClose={toggleSidebar}
           />

      {/* Main Content */}
      <div className="p-4 flex-grow-1 bg-light w-100">
        <h2 className="text-success">📋 My Reports</h2>
        <hr />

        {sortedReports.length > 0 ? (
          <>
            <div className="row g-4 mt-3">
              {currentReports.map((report, index) => (
                <div className="col-12 col-md-6 col-lg-4" key={report.id || index}>
                  <div className="card shadow-sm p-3 h-100">
                    <h5>{report.title || `Report #${index + 1}`}</h5>
                    <p className="text-muted small mb-2">
                    Date: {formatDate(report.reportDate || report.createdAt || new Date().toISOString())}
                    </p>
                    <p>{report.description || "No description available."}</p>

                    <div className="d-flex justify-content-between mt-auto">
                      {report.fileUrl ? (
                        <>
                          <a
                            href={report.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-primary btn-sm w-50 me-2"
                          >
                            View
                          </a>
                          <a
                            href={report.fileUrl}
                            download
                            className="btn btn-outline-success btn-sm w-50"
                          >
                            Download
                          </a>
                        </>
                      ) : (
                        <button className="btn btn-secondary btn-sm w-100" disabled>
                          No File
                        </button>
                      )}
                    </div>
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
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        ) : (
          <p className="text-muted mt-3">No reports uploaded yet.</p>
        )}
      </div>
    </div>
  );
}
