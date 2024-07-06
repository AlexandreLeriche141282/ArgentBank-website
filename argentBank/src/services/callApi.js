
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';

// Fonction pour connecter un utilisateur
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/user/login`, { email, password });
  return response.data.body;
};

// Fonction pour obtenir le profil d'un utilisateur
export const getUserProfile = async (token) => {
  const response = await axios.post(`${API_URL}/user/profile`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.body;
};

// Fonction pour mettre à jour le profil d'un utilisateur
export const updateUserProfile = async (token, userData) => {
  const response = await axios.put(`${API_URL}/user/profile`, userData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.body;
};