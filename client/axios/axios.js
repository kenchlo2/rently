import axios from 'axios';

const api = axios.create({
  // baseURL: '/'
  baseURL: '/api'
});

export default api;
