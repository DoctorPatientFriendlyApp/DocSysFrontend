import axios from "axios";
import { BASE_URL } from "../config";

export const getAllDoctors = async () => {
  const res = await axios.get(`${BASE_URL}/doctors`);
  return res.data;
};

export const loginDoctor = async (credentials) => {
  const res = await axios.post(`${BASE_URL}/doctors/login`, credentials);
  return res.data;
}


export const getDoctorById = async (id) => {
  const res = await axios.get(`${BASE_URL}/doctors/${id}`);
  return res.data;
};

export const addDoctor = async (doctorData) => {
  const res = await axios.post(`${BASE_URL}/doctors`, doctorData);
  return res.data;
};

export const deleteDoctor = async (id) => {
  await axios.delete(`${BASE_URL}/doctors/${id}`);
};


export const updateDoctor = async (id, doctorData) => {
  const res = await axios.put(`${BASE_URL}/doctors/${id}/edit`, doctorData);
  return res.data;
}

export const getPatientsByDoctorId = async (doctorId) => {
  const res = await axios.get(`${BASE_URL}/patients/doctor/${doctorId}`);
  return res;
}


export const getUnassignedPatients = async () => {
  return await axios.get(`${BASE_URL}/patients/unassigned`);
};

export const assignPatientToDoctor = async (patientId, doctorId) => {
  return await axios.post(`${BASE_URL}/doctors/${doctorId}/assignpatienttodoctor/${patientId}`);
};