// Import React
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import para conectar com o servidor
import Axios from "axios";

// Import CSS
import "./style.css";

const CreateAccount = () => {
  const [user, setUser] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [data, setData] = useState([]);

  const submitAccount = (e) => {
    e.preventDefault();

    if (login === "" || user === "" || email === "" || password === "") {
      toast.error("🤨 Preencha todos os campos!");
      return;
    }

    Axios.get("http://localhost:3001/api/get")
      .then((response) => {
        console.log("enviado: ", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao criar conta. Tente novamente mais tarde.");
      });

    if (password !== confirmPassword) {
      toast.error("🤨 As senhas não coincidem!");
      return;
    }

    const filteredData = data.filter((item) => item.login === login);
    console.log("filteredData: ", filteredData);

    if (filteredData.length > 0) {
      toast.error("🤨 Usuário já existe!");
      return;
    } else {
      Axios.post("http://localhost:3001/api/insert", {
        login: login,
        user: user,
        email: email,
        password: password,
      })
        .then((response) => {
          console.log("enviado: ", response);
          toast.success("👄 Conta criada com sucesso!");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Erro ao criar conta. Tente novamente mais tarde.");
        });

      setUser("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setLogin("");
    }
  };

  return (
    <div className="container">
      <div className="CreateAccountBox">
        <h1 className="title">Criar Conta</h1>
        <form className="form">
          <input
            type="text"
            placeholder="Digite o seu nome"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="text"
            placeholder="Usuário"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" onClick={submitAccount}>
            Criar Conta
          </button>
          <ToastContainer closeButton={false} />
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
