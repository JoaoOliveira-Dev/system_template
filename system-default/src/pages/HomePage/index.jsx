import { useState, useEffect, useContext } from "react";

// Authenticated Context
import { AuthContext } from "../../features/auth/authContext";

const HomePages = () => {
  const { authenticated, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Home</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default HomePages;
