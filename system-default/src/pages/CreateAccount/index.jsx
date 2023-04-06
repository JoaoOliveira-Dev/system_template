// Import React
import React from "react";

// Import CSS
import "./style.css";

const CreateAccount = () => {
  return (
    <div className="container">
      <div className="CreateAccountBox">
        <h1 className="title">Criar Conta</h1>
        <form className="form">
          <input type="text" placeholder="Usuário" />
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Senha" />
          <input type="password" placeholder="Confirmar Senha" />
          <button type="submit">Criar Conta</button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
