import { useState, useEffect, useContext } from "react";

// Import do CSS
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

// Authenticated Context
import { AuthContext } from "../../features/auth/authContext";

const HomePages = () => {
  const { authenticated, logout } = useContext(AuthContext);

  return (
    <div className="containerHome">
      <div className="pagesBox">
        <div className="pagesBoxItem">
          <a href="/login">Usuario</a>
          <h1>Home</h1>
          <button onClick={logout}>Logout</button>
        </div>
        <div className="pagesBoxItem">
          <a href="/login">
            <FontAwesomeIcon icon={faUser} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePages;
