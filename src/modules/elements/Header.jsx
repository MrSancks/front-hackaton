import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Cookies from "js-cookie";
import axios from "axios";
import logoMetAgro from "../../logoMetAgroCiruclo.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Detectar cambios en la ubicación
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    // Inicializa AOS
    AOS.init({
      duration: 1000, // Duración de la animación
      once: true, // Se activa solo una vez
    });
  }, []);

  // Verificar sesión al cargar la página o cambiar de ruta
  useEffect(() => {
    const sessionCookie = Cookies.get("token");
    console.log("Contenido de la cookie session:", sessionCookie);
    setHasSession(!!sessionCookie); // Actualiza hasSession según si existe la cookie
  }, [location]); // Ejecutar cada vez que cambie la ubicación

  const handleLogout = async () => {
    try {
      // Realizar la petición de logout
      await axios.post(
          "https://hackaton-back-production.up.railway.app/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`, // Enviar el token en el header Authorization
            },
            withCredentials: true, // Asegúrate de enviar las cookies si es necesario
          }
      );

      // Eliminar cookie y limpiar el almacenamiento
      Cookies.remove("token");
      sessionStorage.removeItem("chatHistory");

      // Redirigir al usuario a la página principal
      setHasSession(false);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
      <header
          className="flex items-center justify-between px-6 py-4 bg-white border-b-2 border-gray-200 shadow-lg"
          data-aos="fade-down"
      >
        {/* Logo */}
        <img
            src={logoMetAgro}
            alt="Logo"
            className="h-12 cursor-pointer"
            onClick={() => navigate("/")}
        />

        {/* Botones */}
        <div className="flex space-x-4">
          {hasSession ? (
              // Mostrar botón de logout si hay sesión
              <button
                  className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
                  onClick={handleLogout}
              >
                Logout
              </button>
          ) : (
              // Mostrar botones de login y registro si no hay sesión
              <>
                <button
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                    onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                    className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
                    onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </>
          )}
        </div>
      </header>
  );
};

export default Header;
