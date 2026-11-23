import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const url = "http://localhost:5000";
export const getLeads = async (params = {}) => {
  const response = await API.get(`${url}/api/leads`, { params });
  return response.data;
};

export const createLead = async (leadData) => {
  const response = await API.post(`${url}/api/leads`, leadData);
  return response.data;
};

export const updateLead = async (id, leadData) => {
  const response = await API.put(`${url}/api/leads/${id}`, leadData);
  return response.data;
};

export const deleteLead = async (id) => {
  const response = await API.delete(`${url}/api/leads/${id}`);
  return response.data;
};
