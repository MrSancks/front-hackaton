import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import CrearProducto from "./ProveedorProducts";

export const ProveedorModal = () => {
  const token = document.cookie;
  const decodetoken = jwtDecode(token);
  
  const [formData, setFormData] = useState({
    supplierName: "",
    nit: "",
    contactPhone: "",
    address: "",
    productsOffered: [], // Inicialmente vacío
    coverageAreas: [],
    transportAvailability: false,
    userId: decodetoken.id, // Valor predeterminado
  });
  const [idcampeche, setIdcampeche] = useState(""); 
  const [isProvider, setIsProvider] = useState(false); // Estado para verificar si ya es proveedor
  
  useEffect(() => {
    // Verificar si el usuario ya es proveedor
    const checkIfUserIsProvider = async () => {
      try {
        const response = await axios.get("https://hackaton-back-production.up.railway.app/suppliers", {
          headers: {
            Authorization: `Bearer ${token}`,// Incluye el token en el encabezado
          },
          withCredentials: true,
        });

        const existingProvider = response.data.data.find(
          (supplier) => supplier.user._id === decodetoken.id,
        );
        
        if (existingProvider) {
          setIsProvider(true);
          setIdcampeche(existingProvider._id);
           // El usuario ya es proveedor
        }
      } catch (error) {
        console.error("Error al verificar proveedor:", error);
      }
    };

    checkIfUserIsProvider();
  }, [token, decodetoken.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCoverageAreasChange = (e) => {
    const { value } = e.target;
    const areas = value.split(",").map(area => area.trim());
    setFormData((prevData) => ({
      ...prevData,
      coverageAreas: areas,
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
      const response = await axios.post(
        "https://hackaton-back-production.up.railway.app/supplier",
        {
          supplierName: formData.supplierName,
          nit: formData.nit,
          contactPhone: formData.contactPhone,
          address: formData.address,
          productsOffered: [],
          coverageAreas: formData.coverageAreas,
          transportAvailability: formData.transportAvailability,
          userId: decodetoken.id,
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
        title: "¡Proveedor registrado!",
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

  if (isProvider) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
        <CrearProducto supplierId={idcampeche} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Registro de Proveedor</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-gray-600 font-medium">Nombre del Proveedor:</label>
          <input
            type="text"
            name="supplierName"
            value={formData.supplierName}
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
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-600 font-medium">Dirección:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-600 font-medium">Áreas de Cobertura (separadas por comas):</label>
          <input
            type="text"
            name="coverageAreas"
            value={formData.coverageAreas.join(", ")}
            onChange={handleCoverageAreasChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ejemplo: Villavicencio, Acacías"
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

        <input
          type="hidden"
          name="userId"
          value={formData.userId}
          readOnly
        />

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-300"
        >
          Registrar Proveedor
        </button>
      </form>
    </div>
  );
};

export default ProveedorModal;
