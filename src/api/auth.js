import axios from './axios';

//const API = 'http://localhost:4000/api';

export const registerRequest = (user) => axios.post(`/users/register`, user);

export const loginRequest = (user) => axios.post(`/users/login`, user);

export const verifyTokenRequest = () => axios.get(`/users/verify`);