import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Importa jwt-decode
import UserInfoDisplay from "../dashboards/Vistas/UserInfoDisplay";

const Profile = () => {
  const [formData, setFormData] = useState({transportAvailability: false});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null); // Store user info (company, peasant, or supplier)
  
  const token = document.cookie; // Get token from cookies
  const decodedToken = jwtDecode(token); // Decode the token
  const id = decodedToken.id; // Destructure id from the decoded token
  const role =decodedToken.role;


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

        // Check if the user belongs to the role-specific data
        if (role === "agricultor") {
          const existingPeasant = response.data.data.find(
            (peasant) => peasant.user._id === decodedToken.id
          );
          if (existingPeasant) {
            setUserInfo(existingPeasant); // Store peasant data
          }
        } else if (role === "proveedor") {
          const existingProvider = response.data.data.find(
            (provider) => provider.user._id === decodedToken.id
          );
          if (existingProvider) {
            setUserInfo(existingProvider); // Store provider data
          }
        } else if (role === "empresa turistica") {
          const existingCompany = response.data.data.find(
            (company) => company.user._id === decodedToken.id
          );
          if (existingCompany) {
            setUserInfo(existingCompany); // Store company data
          }
        }
      } catch (err) {
        setError(err.message); // Handle error
      } finally {
        setIsLoading(false);
      }
    };
    checkUserRole();
  }, [token, decodedToken.id, role]);

  // Handle form data changes
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
  // Handle form submission for updating data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get the ID of the specific resource (peasant, provider, or company)
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

      // Send PUT request to update data
      const response = await axios.put(url, formData, {
        headers,
        withCredentials: true,
      });

      console.log("Data updated successfully:", response.data);
      alert("Data updated successfully!");
      window.location.reload();
      
    } catch (error) {
      setError("Error updating data: " + error.message);
      console.error("Error updating data:", error);
    }
  };

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Perfil</h2>
        {/* Render UserInfoDisplay with the current data */}
      {role === "agricultor" && userInfo && <UserInfoDisplay role={role} data={userInfo} />}
      {role === "proveedor" && userInfo && <UserInfoDisplay role={role} data={userInfo} />}
      {role === "empresa turistica" && userInfo && <UserInfoDisplay role={role} data={userInfo} />}


        <h2 className="text-2xl font-bold mb-4">Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        {/* Render specific form based on role */}
        {role === "empresa turistica" && (
          <>
            <div>
              <label className="block text-gray-600">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
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
                name="contact"
                value={formData.contact}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </>
        )}

        {role === "agricultor" && (
          <>
            <div>
              <label className="block text-gray-600">Nombre</label>
              <input
                type="text"
                name="farmName"
                value={formData.farmName}
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
              <label className="block text-gray-600">Contacto</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </>
        )}

        {role === "proveedor" && (
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

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default Profile;
