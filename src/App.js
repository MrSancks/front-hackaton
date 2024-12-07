import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import CompanyDashboard from "./modules/dashboards/CompanyDashboard";
import Cookies from "js-cookie";
import ChatWidget from "./modules/ChatWidget";

const App = () => {
    // Inicializamos AOS al cargar la aplicación
    useEffect(() => {
        AOS.init({
            duration: 1000, // Duración en ms de las animaciones
            once: true, // Las animaciones se activan solo una vez
        });
    }, []);

    return (
        <Router>
            <Header />
            <AppRoutes />
            <Footer />
        </Router>
    );
};

const AppRoutes = () => {
    const [hasSession, setHasSession] = useState(false);
    const location = useLocation(); // Hook para detectar cambios de ruta

    // Verificar la sesión cada vez que cambie la ruta
    useEffect(() => {
        const checkSession = () => {
            const sessionCookie = Cookies.get("token");
            console.log("Contenido de la cookie session:", sessionCookie);
            if (sessionCookie) {
                setHasSession(true);
            } else {
                setHasSession(false);
                sessionStorage.removeItem("chatHistory");
            }
        };

        checkSession(); // Ejecutar verificación al cargar la página
    }, [location.pathname]); // Ejecutar cada vez que cambie la ruta

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/proveedor-dashboard" element={<ProveedorDashboard />} />
                <Route path="/agricultor-dashboard" element={<AgricultorDashboard />} />
                <Route path="/company-dashboard" element={< CompanyDashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
            {hasSession && <ChatWidget />}
        </>
    );
};

export default App;
