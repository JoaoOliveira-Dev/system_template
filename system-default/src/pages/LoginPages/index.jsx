// Imports do REACT
import { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MD5 } from "crypto-js";

// Import para conectar com o servidor
import Axios from "axios";
import { LoginAuth } from "../../features/Api/api";

// Import do CSS
import "./style.css";

// Authenticated Context
import { AuthContext } from "../../features/auth/authContext";

const LoginPages = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { authenticated, login } = useContext(AuthContext);

  const getReq = (e) => {
    e.preventDefault();

    login(user, password); // Integração com o contexto / api

    if (authenticated) {
      toast.success("Login efetuado com sucesso!");
    } else {
      toast.error("Usuário não encontrado. Tente novamente.");
    }

    setUser("");
    setPassword("");
  };

  return (
    <div className="container">
      <div className="loginBox">
        <h1 className="title">Login</h1>
        <form className="form">
          <input
            type="text"
            placeholder="Usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={getReq}>
            Entrar
          </button>
        </form>
        <p>{String(authenticated)}</p>
        <div className="links">
          {/* <a href="#">Esqueceu a senha?</a> */}
          <a href="/create-account">Criar uma conta</a>
          <a href="/render-list">Renderizar lista</a>
        </div>
      </div>
      <ToastContainer closeButton={false} />
    </div>
  );
};

export default LoginPages;
