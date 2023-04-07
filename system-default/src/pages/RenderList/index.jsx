// Imports do REACT
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import para conectar com o servidor
import Axios from "axios";

// Import do CSS
import "./style.css";

const RenderList = () => {
  return (
    <div className="container">
      <div className="container-render"></div>
    </div>
  );
};

export default RenderList;
