// Import React
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import estilização
import "./App.css";

// Import components
import LoginPages from "./pages/LoginPages";
import HomePages from "./pages/HomePage";
import CreateAccount from "./pages/CreateAccount";
import RenderList from "./pages/RenderList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPages />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/render-list" element={<RenderList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
