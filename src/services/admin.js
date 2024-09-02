import api from "../configs/api";

export const addCategory = (data) => api.post("category", data);

export const getCategory = () => api.get("category");
