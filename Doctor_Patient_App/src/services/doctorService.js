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
