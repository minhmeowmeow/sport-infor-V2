import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = (userData) => {
  return axios.post(`${API_URL}/auth/register`, userData);
};

export const login = (userData) => {
  return axios.post(`${API_URL}/auth/login`, userData);
};

export const addGuestbookEntry = (entryData) => {
  return axios.post(`${API_URL}/guestbook`, entryData);
};

export const getGuestbookEntries = () => {
  return axios.get(`${API_URL}/guestbook`);
};
