import axios from "axios";
const token = localStorage.getItem("token");

const http = axios.create({
  baseURL: "http://localhost:3500/",
  headers: { Authorization: `Bearer ${token}` },
});

http.interceptors.request.use(
  function (config) {
    return { ...config };
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
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);
export default http;
