// Import React
import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Import components
import LoginPages from "./pages/LoginPages";
import HomePages from "./pages/HomePage";
import CreateAccount from "./pages/CreateAccount";
import RenderList from "./pages/RenderList";

// Import AuthContext
import { AuthProvider, AuthContext } from "./features/auth/authContext";

function Router() {
  const Private = ({ children }) => {
    const { authenticated } = useContext(AuthContext);

    console.log("authenticated", authenticated);
    return authenticated ? children : <Navigate to="/" />;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginPages />} />
            <Route
              path="/home"
              element={
                <Private>
                  <HomePages />
                </Private>
              }
            />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/render-list" element={<RenderList />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default Router;
