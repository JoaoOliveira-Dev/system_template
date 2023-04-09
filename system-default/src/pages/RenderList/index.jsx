// Imports do REACT
import { useState, useEffect, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";

// Import para conectar com o servidor
import Axios from "axios";

// Import do CSS
import "./style.css";

const RenderList = () => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  const columns = [
    {
      name: "ID",
      selector: "id_pk",
      sortable: true,
    },
    {
      name: "Usuario",
      selector: "usuario",
      sortable: true,
    },
    {
      name: "Senha",
      selector: "senha",
      sortable: true,
    },
  ];

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setList(response.data);
      setSearch(response.data);
      toast.success("👄 Registros retornados com sucesso!");
    });
  }, []);

  const deleteItem = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`).then((response) => {
      setList(
        list.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  const handleClick = (e) => {
    const newData = list.filter((item) => {
      return item.usuario.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearch(newData);
  };

  return (
    <div className="container">
      <div className="container-render">
        <div className="container-search">
          <input
            className="text-end"
            type="text"
            placeholder="Pesquisar"
            onChange={handleClick}
          />
        </div>
        <DataTable
          columns={columns}
          data={search}
          selectableRows
          fixedHeader
          pointerOnHover
          responsive
          noDataComponent="Nenhum registro encontrado"
        />

        <ToastContainer closeButton={false} />
      </div>
    </div>
  );
};

export default RenderList;
