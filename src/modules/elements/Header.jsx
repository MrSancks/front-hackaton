import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // Importa los estilos de AOS

const Header = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Inicializa AOS
    AOS.init({
      duration: 1000,  // Duración de la animación
      once: true,      // Se activa solo una vez
    });
  }, []);

  return (
    <header
      className="flex items-center justify-between px-6 py-4 bg-white border-b-2 border-gray-200 shadow-lg"
      data-aos="fade-down"
    >
      {/* Logo */}
      <img
        src="/logo.png"
        alt="Logo"
        className="h-12 cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* Botones */}
      <div className="flex space-x-4">
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
      </div>
    </header>
  );
};

export default Header;
