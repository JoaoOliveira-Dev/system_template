import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const Login = (user, password) => {
  return api.post("/login", { user, password });
};

export const IsAuth = () => {
  axios
    .get("http://localhost:3001/api/isAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
    .then((response) => {
      console.log("resposta", response);
    });
  return true;
};
