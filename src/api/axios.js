import axios from "axios";
// import { API_URL } from "../config";

const instance = axios.create({
  baseURL: 'http://localhost:8086/api',
  //baseURL: 'https://hamuk-api.vercel.app/api',
  withCredentials: true
});

export default instance;