import React, { createContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Login, IsAuth } from "../Api/api";
import Axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const recoveredUser = localStorage.getItem("token");

    if (recoveredUser) {
      setUser(recoveredUser);
      navigate("/home");
    }

    setLoading(false);
  }, []);

  const login = async (user, password) => {
    const ret = await Login(user, password);
    console.log("ret", ret);
    const id = ret.data[0].id;

    if (ret) {
      setUser({ id, user });
      const token = ret.data[0].token;
      localStorage.setItem("token", token);

      // axios.defaults.headers.common["x-access-token"] = `Bearer ${token}`;

      IsAuth();

      navigate("/home");

      return true;
    }
  };

  const logout = () => {
    console.log("logout");
    localStorage.removeItem("token");
    navigate("/");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
