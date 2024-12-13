import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import logoMetAgro from "../../logoMetAgroCiruclo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUserPlus,
  faUser,
  faSignOutAlt,
  faTachometerAlt,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hasSession, setHasSession] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    const cookieString = document.cookie;
    const cookies = Object.fromEntries(
        cookieString.split("; ").map((c) => c.split("="))
    );

    const token = cookies.token;
    const userInfo = cookies.userInfo
        ? JSON.parse(decodeURIComponent(cookies.userInfo))
        : null;

    setHasSession(!!token);
    if (userInfo) setUserRole(userInfo.role);
  }, [location]);

  const handleLogout = async () => {
    try {
      await axios.post(
          "https://hackaton-back-production.up.railway.app/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${
                  document.cookie
                      .split("; ")
                      .find((row) => row.startsWith("token="))
                      ?.split("=")[1]
              }`,
            },
            withCredentials: true,
          }
      );

      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
          "userInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      sessionStorage.removeItem("chatHistory");

      setHasSession(false);
      setUserRole("");
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Ahora el logo siempre lleva al homepage
  const handleLogoClick = () => {
    navigate("/");
  };

  const isOnProfilePage = location.pathname.includes("profile");
  const isOnDashboard =
      location.pathname.includes("agricultor-dashboard") ||
      location.pathname.includes("proveedor-dashboard") ||
      location.pathname.includes("company-dashboard") ||
      location.pathname.includes("dashboard");

  const isOnHome = location.pathname === "/";

  return (
      <header
          className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200"
          data-aos="fade-down"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4 cursor-pointer" onClick={handleLogoClick}>
            <img
                src={logoMetAgro}
                alt="Logo"
                className="h-12 transform transition duration-200 hover:scale-105"
            />
            <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
              MetAgro
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {hasSession ? (
                <>
                  {isOnHome ? (
                      <>
                        {/* Móvil: icono para ir al Dashboard */}
                        <button
                            onClick={() => {
                              // Ir al dashboard según el rol
                              switch (userRole) {
                                case "administrador":
                                  navigate("/dashboard");
                                  break;
                                case "agricultor":
                                  navigate("/agricultor-dashboard");
                                  break;
                                case "proveedor":
                                  navigate("/proveedor-dashboard");
                                  break;
                                case "empresa turistica":
                                  navigate("/company-dashboard");
                                  break;
                                default:
                                  navigate("/");
                              }
                            }}
                            className="md:hidden text-orange-600 hover:text-orange-800 transition"
                        >
                          <FontAwesomeIcon icon={faTachometerAlt} className="h-6 w-6" />
                        </button>
                        {/* Escritorio: texto + icono Ir al Dashboard */}
                        <button
                            onClick={() => {
                              // Ir al dashboard según el rol
                              switch (userRole) {
                                case "administrador":
                                  navigate("/dashboard");
                                  break;
                                case "agricultor":
                                  navigate("/agricultor-dashboard");
                                  break;
                                case "proveedor":
                                  navigate("/proveedor-dashboard");
                                  break;
                                case "empresa turistica":
                                  navigate("/company-dashboard");
                                  break;
                                default:
                                  navigate("/");
                              }
                            }}
                            className="hidden md:inline-flex px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition duration-200 flex items-center space-x-2"
                        >
                          <FontAwesomeIcon icon={faTachometerAlt} />
                          <span>Ir al Dashboard</span>
                        </button>
                      </>
                  ) : (
                      <>
                        {/* Móvil: icono para ir al Home */}
                        <button
                            onClick={() => navigate("/")}
                            className="md:hidden text-purple-600 hover:text-purple-800 transition"
                        >
                          <FontAwesomeIcon icon={faHome} className="h-6 w-6" />
                        </button>
                        {/* Escritorio: texto + icono Ir al Home */}
                        <button
                            onClick={() => navigate("/")}
                            className="hidden md:inline-flex px-4 py-2 bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-600 transition duration-200 flex items-center space-x-2"
                        >
                          <FontAwesomeIcon icon={faHome} />
                          <span>Ir al Home</span>
                        </button>
                      </>
                  )}

                  {userRole !== "administrador" && isOnDashboard && (
                      <>
                        {/* Móvil: solo icono perfil */}
                        <button
                            onClick={() => navigate("/profile")}
                            className="md:hidden text-blue-600 hover:text-blue-800 transition"
                        >
                          <FontAwesomeIcon icon={faUser} className="h-6 w-6" />
                        </button>
                        {/* Escritorio: texto + icono perfil */}
                        <button
                            onClick={() => navigate("/profile")}
                            className="hidden md:inline-flex px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-200 flex items-center space-x-2"
                        >
                          <FontAwesomeIcon icon={faUser} />
                          <span>Mi Perfil</span>
                        </button>
                      </>
                  )}

                  {userRole !== "administrador" && isOnProfilePage && !isOnDashboard && (
                      <>
                        {/* Móvil: icono verde dashboard */}
                        <button
                            onClick={() => {
                              // Ir al dashboard según el rol
                              switch (userRole) {
                                case "administrador":
                                  navigate("/dashboard");
                                  break;
                                case "agricultor":
                                  navigate("/agricultor-dashboard");
                                  break;
                                case "proveedor":
                                  navigate("/proveedor-dashboard");
                                  break;
                                case "empresa turistica":
                                  navigate("/company-dashboard");
                                  break;
                                default:
                                  navigate("/");
                              }
                            }}
                            className="md:hidden text-green-600 hover:text-green-800 transition"
                        >
                          <FontAwesomeIcon icon={faTachometerAlt} className="h-6 w-6" />
                        </button>
                        {/* Escritorio */}
                        <button
                            onClick={() => {
                              // Ir al dashboard según el rol
                              switch (userRole) {
                                case "administrador":
                                  navigate("/dashboard");
                                  break;
                                case "agricultor":
                                  navigate("/agricultor-dashboard");
                                  break;
                                case "proveedor":
                                  navigate("/proveedor-dashboard");
                                  break;
                                case "empresa turistica":
                                  navigate("/company-dashboard");
                                  break;
                                default:
                                  navigate("/");
                              }
                            }}
                            className="hidden md:inline-flex px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition duration-200 flex items-center space-x-2"
                        >
                          <FontAwesomeIcon icon={faTachometerAlt} />
                          <span>Ir al Dashboard</span>
                        </button>
                      </>
                  )}

                  {/* Móvil: icono rojo logout */}
                  <button
                      onClick={handleLogout}
                      className="md:hidden text-red-600 hover:text-red-800 transition"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="h-6 w-6" />
                  </button>
                  {/* Escritorio: texto + icono logout */}
                  <button
                      onClick={handleLogout}
                      className="hidden md:inline-flex px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition duration-200 flex items-center space-x-2"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <span>Cerrar Sesión</span>
                  </button>
                </>
            ) : (
                <>
                  {/* No sesión */}
                  {/* Móvil: icono azul login */}
                  <button
                      onClick={() => navigate("/login")}
                      className="md:hidden text-blue-600 hover:text-blue-800 transition"
                  >
                    <FontAwesomeIcon icon={faSignInAlt} className="h-6 w-6" />
                  </button>
                  {/* Escritorio: texto + icono login */}
                  <button
                      onClick={() => navigate("/login")}
                      className="hidden md:inline-flex px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-200 flex items-center space-x-2"
                  >
                    <FontAwesomeIcon icon={faSignInAlt} />
                    <span>Iniciar Sesión</span>
                  </button>

                  {/* Móvil: icono verde register */}
                  <button
                      onClick={() => navigate("/register")}
                      className="md:hidden text-green-600 hover:text-green-800 transition"
                  >
                    <FontAwesomeIcon icon={faUserPlus} className="h-6 w-6" />
                  </button>
                  {/* Escritorio: texto + icono register */}
                  <button
                      onClick={() => navigate("/register")}
                      className="hidden md:inline-flex px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-700 transition duration-200 flex items-center space-x-2"
                  >
                    <FontAwesomeIcon icon={faUserPlus} />
                    <span>Registrarse</span>
                  </button>
                </>
            )}
          </div>
        </div>
      </header>
  );
};

export default Header;
