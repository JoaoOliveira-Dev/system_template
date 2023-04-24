import React, { createContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { LoginAuth } from "../Api/api";

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

  const login = async (id, usuario) => {
    const ret = await LoginAuth(id, usuario);
    console.log(ret);

    if (ret) {
      setUser({ id, usuario });
      localStorage.setItem("user", JSON.stringify({ id, usuario }));
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
