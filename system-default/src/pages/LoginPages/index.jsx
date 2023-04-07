// Imports do REACT
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import para conectar com o servidor
import Axios from "axios";

// Import do CSS
import "./style.css";

const LoginPages = () => {
  const getReq = (e) => {
    e.preventDefault();

    Axios.get("http://localhost:3001/api/get")
      .then((response) => {
        console.log("enviado: ", response.data);
        toast.success("👄 Conta criada com sucesso!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao criar conta. Tente novamente mais tarde.");
      });
    return;
  };

  return (
    <div className="container">
      <div className="loginBox">
        <h1 className="title">Login</h1>
        <form className="form">
          <input type="text" placeholder="Usuário" />
          <input type="password" placeholder="Senha" />
          <button type="submit" onClick={getReq}>
            Entrar
          </button>
        </form>
        <div className="links">
          <a href="#">Esqueceu a senha?</a>
          <a href="/create-account">Criar uma conta</a>
          <a href="/render-list">Renderizar lista</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPages;
