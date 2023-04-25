import React, { createContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Login } from "../Api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
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
      localStorage.setItem("user", JSON.stringify({ token, id, user }));
      navigate("/home");

      return true;
    }
  };

  const logout = () => {
    console.log("logout");
    localStorage.removeItem("user");
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
