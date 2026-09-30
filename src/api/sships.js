import axios from "./axios";

export const getBecasRequest = (signal) => axios.get("/scholarships/get_all", { signal });

export const createBecaRequest = (beca) => axios.post("/scholarships/create", beca);

export const updateBecaRequest = (id,beca) =>
  axios.post(`/scholarships/update/${id}`, beca);

export const deleteBecaRequest = (id) => axios.delete(`/scholarships/delete/${id}`);

export const getBecaRequest = (id, signal) => axios.get(`/scholarships/${id}`, { signal });
