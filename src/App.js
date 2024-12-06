import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // Importa los estilos de AOS

// Importación de componentes
import Login from "./modules/login";
import Dashboard from "./modules/dashboard";
import Register from "./modules/register";
import HomePage from "./modules/homePage";
import Header from "./modules/elements/Header";
import Footer from "./modules/elements/Footer";
import ProveedorDashboard from "./modules/dashboards/ProveedorDashboard";
import AgricultorDashboard from "./modules/dashboards/AgricultorDashboard";
import Cookies from "js-cookie";
import ChatWidget from "./modules/ChatWidget";

const App = () => {
    const [hasSession, setHasSession] = useState(false);

    useEffect(() => {
        const sessionCookie = Cookies.get('session');
        if (sessionCookie) {
            setHasSession(true);
        } else {
            setHasSession(false);
            sessionStorage.removeItem('chatHistory');
        }
    }, []);

    // Inicializamos AOS al cargar la aplicación
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración en ms de las animaciones
      once: true, // Las animaciones se activan solo una vez
    });
  }, []);

  return (
    <Router>
      <Routes>
        {/* Rutas con Header y Footer */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <HomePage />
              <Footer />
            </>
          }
        />
        <Route
          path="/proveedor-dashboard"
          element={
            <>
              <Header />
              <ProveedorDashboard />
              <Footer />
            </>
          }
        />
        <Route
          path="/agricultor-dashboard"
          element={
            <>
              <Header />
              <AgricultorDashboard />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Header />
              <Login />
              <Footer />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Header />
              <Register />
              <Footer />
            </>
          }
        />
        {/* Rutas exclusivas como Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
        {<ChatWidget />}

    </Router>
  );
};

export default App;
