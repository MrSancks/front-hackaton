import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Corrige el import de jwt-decode

export const CompanyModal = () => {

  const token = document.cookie;
  const decodedToken = jwtDecode(token); // Decodifica el token para obtener el userId
  
  const [formData, setFormData] = useState({
    companyName: "",
    nit: "",
    contact: "",
    userId: decodedToken.id, // Obtén el ID del usuario desde el token
  });

  const [isCompany, setIsCompany] = useState(false); // Verifica si ya es empresa
  const [companyId, setCompanyId] = useState(""); // Almacena el ID de la empresa si ya existe

  useEffect(() => {
    // Verificar si el usuario ya tiene una empresa registrada
    const checkIfUserIsCompany = async () => {
      try {
        const response = await axios.get("https://hackaton-back-production.up.railway.app/companies", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        const existingCompany = response.data.data.find(
          (company) => company.user._id === decodedToken.id
        );

        if (existingCompany) {
          setIsCompany(true);
          setCompanyId(existingCompany._id); // Almacena el ID de la empresa existente
        }
      } catch (error) {
        console.error("Error al verificar empresa:", error);
      }
    };

    checkIfUserIsCompany();
  }, [token, decodedToken.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://hackaton-back-production.up.railway.app/company",
        {
          companyName: formData.companyName,
          nit: formData.nit,
          contact: formData.contact,
          userId: decodedToken.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      Swal.fire({
        icon: "success",
        title: "¡Empresa registrada!",
        text: response.data.message || "Los datos han sido guardados correctamente.",
      });
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Error en el registro",
          text: error.response.data.message || "Hubo un problema al guardar los datos.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error en la conexión",
          text: "No se pudo conectar con el servidor. Por favor, inténtalo más tarde.",
        });
      }
    }
  };

  if (isCompany) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Ya eres una Empresa Registrada</h2>
        <p className="text-center text-gray-600">
          Tu empresa ya está registrada en el sistema. ID: {companyId}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Registro de Empresa</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-gray-600 font-medium">Nombre de la Empresa:</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-600 font-medium">NIT:</label>
          <input
            type="text"
            name="nit"
            value={formData.nit}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-600 font-medium">Teléfono de Contacto:</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <input type="hidden" name="userId" value={formData.userId} readOnly />

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-300"
        >
          Registrar Empresa
        </button>
      </form>
    </div>
  );
};

export default CompanyModal;
