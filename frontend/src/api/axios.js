import axios from 'axios';

const API = axios.create({
    baseURL: 'https://palette-folio.vercel.app/api',
  // baseURL: 'http://localhost:5000/api',
});

// Add token to requests if user is logged in
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default API;
