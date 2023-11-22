import axios from "axios";
const token = localStorage.getItem('token');


const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { Authorization: `Bearer ${token}` },
});

http.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    ;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
http.interceptors.response.use(
  async function (response) {
    if (response.data) {
      return response.data;
    }
    return response;
  },
  async function (error) {
    if (error) {
      return Promise.reject(error.response.data.error);
    }
    return Promise.reject(error);
  }
);
export default http;
