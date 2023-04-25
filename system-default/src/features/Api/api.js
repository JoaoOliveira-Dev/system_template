import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const LoginAuth = (user, password) => {
  return api.post("/login", { user, password })
};
