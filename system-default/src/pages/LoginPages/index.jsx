// Imports do REACT
import React from "react";

// Import do CSS
import "./style.css";

const LoginPages = () => {
  return (
    <div className="container">
      <div className="loginBox">
        <h1 className="title">Login</h1>
        <form className="form">
          <input type="text" placeholder="Usuário" />
          <input type="password" placeholder="Senha" />
          <button type="submit">Entrar</button>
        </form>
        <a href="#">Esqueceu a senha?</a>
        <a href="/create-account">Criar uma conta</a>
      </div>
    </div>
  );
};

export default LoginPages;
