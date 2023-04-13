// Imports do REACT
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

// Import para conectar com o servidor
import Axios from "axios";

// Import do CSS
import "./style.css";

const LoginPages = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getReq = (e) => {
    e.preventDefault();

    Axios.get("http://localhost:3001/api/get")
      .then((response) => {
        console.log("enviado: ", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao criar conta. Tente novamente mais tarde.");
      });

    //create a new array with all users that have the same username
    const filteredData = data.filter((item) => item.usuario === user);
    console.log("filteredData: ", filteredData);

    //check if the filtered array has at least one item
    if (filteredData.length > 0) {
      //check if the password is correct
      if (filteredData[0].senha === password) {
        toast.success("👄 Login efetuado com sucesso!");
        navigate("/home");
      } else {
        toast.error("Senha incorreta. Tente novamente.");
      }
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
        <div className="links">
          <a href="#">Esqueceu a senha?</a>
          <a href="/create-account">Criar uma conta</a>
          <a href="/render-list">Renderizar lista</a>
        </div>
      </div>
      <ToastContainer closeButton={false} />
    </div>
  );
};

export default LoginPages;
