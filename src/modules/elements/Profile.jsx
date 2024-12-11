import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import UserInfoDisplay from "../dashboards/Vistas/UserInfoDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBox,
  faClipboardList,
  faEye,
  faTimes,
  faHotel,
  faTruck, faFolder, faInfoCircle,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [formData, setFormData] = useState({ transportAvailability: false });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [selectedTab, setSelectedTab] = useState("informacion"); // Controla la pestaña seleccionada

  const token = document.cookie; // Obtén el token de las cookies
  const decodedToken = jwtDecode(token); // Decodifica el token
  const id = decodedToken.id;
  const role = decodedToken.role;

  // Fetch user data based on the role
  useEffect(() => {
    const checkUserRole = async () => {
      try {
        let url = "";
        if (role === "agricultor") {
          url = "https://hackaton-back-production.up.railway.app/peasants";
        } else if (role === "proveedor") {
          url = "https://hackaton-back-production.up.railway.app/suppliers";
        } else if (role === "empresa turistica") {
          url = "https://hackaton-back-production.up.railway.app/companies";
        } else {
          throw new Error("Rol no reconocido");
        }

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(url, {
          headers,
          withCredentials: true,
        });

        if (role === "agricultor") {
          const existingPeasant = response.data.data.find(
            (peasant) => peasant.user._id === decodedToken.id
          );
          if (existingPeasant) {
            setUserInfo(existingPeasant);
          }
        } else if (role === "proveedor") {
          const existingProvider = response.data.data.find(
            (provider) => provider.user._id === decodedToken.id
          );
          if (existingProvider) {
            setUserInfo(existingProvider);
          }
        } else if (role === "empresa turistica") {
          const existingCompany = response.data.data.find(
            (company) => company.user._id === decodedToken.id
          );
          if (existingCompany) {
            setUserInfo(existingCompany);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    checkUserRole();
  }, [token, decodedToken.id, role]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleTransportAvailabilityChange = (e) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      transportAvailability: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resourceId = userInfo ? userInfo._id : null;
      if (!resourceId) {
        throw new Error("Resource ID is missing");
      }

      let url = "";
      if (role === "agricultor") {
        url = `https://hackaton-back-production.up.railway.app/peasant/${resourceId}`;
      } else if (role === "proveedor") {
        url = `https://hackaton-back-production.up.railway.app/supplier/${resourceId}`;
      } else if (role === "empresa turistica") {
        url = `https://hackaton-back-production.up.railway.app/company/${resourceId}`;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(url, formData, {
        headers,
        withCredentials: true,
      });

      alert("Datos actualizados correctamente");
      window.location.reload();
    } catch (error) {
      setError("Error al actualizar los datos: " + error.message);
    }
  };

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <nav className="mb-6">
        <ul className="flex space-x-4">
          <li
            onClick={() => setSelectedTab("informacion")}
            className={`cursor-pointer p-4 border-b-2 ${
                selectedTab === "informacion" ? "border-blue-600 text-blue-600 font-bold" : "border-transparent"
            }`}
          >
            <FontAwesomeIcon icon={faUser} className="text-lg" /> Datos de Empresa
          </li>
          <li
            onClick={() => setSelectedTab("editar")}
            className={`cursor-pointer p-4 border-b-2 ${
                selectedTab === "editar" ? "border-blue-600 text-blue-600 font-bold" : "border-transparent"
            }`}
          >
            <FontAwesomeIcon icon={faPen} className="text-lg" /> Editar Perfil de Empresa
          </li>
        </ul>
      </nav>

      {selectedTab === "informacion" && (
        <div>
          {role === "agricultor" && userInfo && (
            <UserInfoDisplay role={role} data={userInfo} />
          )}
          {role === "proveedor" && userInfo && (
            <UserInfoDisplay role={role} data={userInfo} />
          )}
          {role === "empresa turistica" && userInfo && (
            <UserInfoDisplay role={role} data={userInfo} />
          )}
        </div>
      )}

      {selectedTab === "editar" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Editar Perfil</h2>
          <form onSubmit={handleSubmit}>
            {role === "empresa turistica" && (
              <>
                <div>
                  <label className="block text-gray-600">Nombre de la empresa</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName || ""}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">NIT</label>
                  <input
                    type="text"
                    name="nit"
                    value={formData.nit || ""}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Contacto</label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact || ""}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </>
            )}        {role === "proveedor" && (
              <>
                <div>
                  <label className="block text-gray-600">Nombre</label>
                  <input
                    type="text"
                    name="supplierName"
                    value={formData.supplierName}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">NIT</label>
                  <input
                    type="text"
                    name="nit"
                    value={formData.nit}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Contacto</label>
                  <input
                    type="text"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Dirección</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Areas Cubiertas</label>
                  <input
                    type="text"
                    name="coverageAreas"
                    value={formData.coverageAreas}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
              <label className="inline-flex items-center text-gray-600 font-medium">
                <input
                  type="checkbox"
                  name="transportAvailability"
                  checked={formData.transportAvailability}
                  onChange={handleTransportAvailabilityChange}
                  className="mr-2"
                />
                ¿Disponibilidad de transporte?
              </label>
            </div>
              </>
            )}

            {/* Formularios adicionales para "agricultor" y "proveedor" */}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
            >
              Guardar Cambios
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
