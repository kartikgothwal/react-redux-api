// api.ts
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/';

export const fetchUserData = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const addUserData = async (userData: any) => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
};

export const deleteUserData = async (userId: number) => {
  const response = await axios.delete(`${API_URL}/users/${userId}`);
  return response.data;
};

export const updateUserData = async (userData: any) => {
  const response = await axios.put(`${API_URL}/users/${userData.id}`, userData);
  return response.data;
};
