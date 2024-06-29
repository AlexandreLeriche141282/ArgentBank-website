// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/user/login`, { email, password });
  return response.data.body;
};

export const getUserProfile = async (token) => {
  const response = await axios.post(`${API_URL}/user/profile`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.body;
};

export const updateUserProfile = async (token, userData) => {
  const response = await axios.put(`${API_URL}/user/profile`, userData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.body;
};