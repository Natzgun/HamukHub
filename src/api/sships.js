import axios from "./axios";

export const getBecasRequest = () => axios.get("/scholarships/get_all");

export const createBecaRequest = (beca) => axios.post("/scholarships/create", beca);

export const updateBecaRequest = (id,beca) =>
  axios.put(`/scholarships/update/${id}`, beca);

export const deleteBecaRequest = (id) => axios.delete(`/scholarships/delete/${id}`);

export const getBecaRequest = (id) => axios.get(`/scholarships/${id}`);