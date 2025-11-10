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

export const addPatient = async (patientData) => {
  const res = await axios.post(`${BASE_URL}/patients`, patientData);
  return res.data;
};

export const deletePatient = async (id) => {
  await axios.delete(`${BASE_URL}/patients/${id}`);
};
