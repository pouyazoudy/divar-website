import api from "../configs/api";

export const getProfile = () => api.get("user/whoami").then(res => res || false);

export const getPosts = () => api.get("post/my")

export const getAllPosts = () => api.get("")