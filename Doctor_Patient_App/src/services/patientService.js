import axios from "axios";
import { BASE_URL } from "../config";



export const loginPatient = async (credentials) => {
  const res = await axios.post(`${BASE_URL}/patients/login`, credentials);
  return res.data;
}


export const getAllPatients = async () => {
  const res = await axios.get(`${BASE_URL}/patients`);
  return res.data;
};

export const getPatientById = async (id) => {
  const res = await axios.get(`${BASE_URL}/patients/${id}`);
  console.log(" Patient "+ res.data)
  return res.data;
}

export const addPatient = async (patientData) => {
  const res = await axios.post(`${BASE_URL}/patients`, patientData);
  return res.data;
};

export const deletePatient = async (id) => {
  await axios.delete(`${BASE_URL}/patients/${id}`);
};

// export const updatePatient = async (id, patientData) => {
//   const res = await axios.put(`${BASE_URL}/patients/updatepatient/${id}`, patientData);
//   return res.data;
// }

// --------------------------------------------------------------------
export const updatePatient = async (id, patientData) => {
  console.log(" update " ,patientData);
  const formData = new FormData();

  // JSON
  formData.append(
    "patient",
    new Blob([JSON.stringify(patientData)], { type: "application/json" })
  );

  // FILES
  patientData.reports.forEach((r) => {
    if (r.file instanceof File) {
      formData.append("files", r.file);
    }
  });

  const res = await axios.put(
    `${BASE_URL}/patients/updatepatient/${id}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
   console.log(" after update "+ res)
  return res.data;
};

//----------------------------------------------------------------------

export const getDoctorsForPatient = async (id) => {
  const res = await axios.get(`${API_URL}/${id}/doctors`);
  return res.data;
};

export const getDoctorsByPatientId = async (patientId) => {
  const res = await axios.get(`${BASE_URL}/patients/${patientId}/doctors`);
  return res.data;
}