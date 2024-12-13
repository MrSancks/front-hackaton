import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPen, faPhone, faIdCard, faLeaf, faWarehouse, faBuilding, faRoad, faCheckSquare, faLocationArrow, faBox, } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import UserInfoDisplay from "../dashboards/Vistas/UserInfoDisplay";

const Profile = () => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [selectedTab, setSelectedTab] = useState("informacion");
  const token = document.cookie;
  const decodedToken = jwtDecode(token);
  const id = decodedToken.id;
  const role = decodedToken.role;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "";
        switch (role) {
          case "agricultor":
            url = `https://hackaton-back-production.up.railway.app/peasants`;
            break;
          case "proveedor":
            url = `https://hackaton-back-production.up.railway.app/suppliers`;
            break;
          case "empresa turistica":
            url = `https://hackaton-back-production.up.railway.app/companies`;
            break;
          default:
            throw new Error("Rol no reconocido");
        }

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(url, { headers, withCredentials: true });
        const data = response.data.data.find((item) => item.user._id === id);
        if (data) {
          setUserInfo(data);
          setFormData(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, id, role]);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Soporte para nested fields como ubication y arrays:
    if (name.includes(".")) {
      const [parent, child, index, field] = name.split(/[.\[\]]/).filter(Boolean);
      // parent podría ser ubication o productsOffered, etc.
      if (name.startsWith("ubication.")) {
        setFormData((prevData) => ({
          ...prevData,
          ubication: {
            ...prevData.ubication,
            [child]: value,
          },
        }));
      } else if (name.startsWith("products[") || name.startsWith("productsOffered[")) {
        // Actualizar arrays de productos o productsOffered
        const arrName = parent; // products o productsOffered
        const arrIndex = parseInt(child, 10);
        const arrField = field;

        setFormData((prevData) => {
          const updatedArr = [...(prevData[arrName] || [])];
          updatedArr[arrIndex] = { ...updatedArr[arrIndex], [arrField]: value };
          return { ...prevData, [arrName]: updatedArr };
        });
      } else if (name.startsWith("coverageAreas")) {
        // coverageAreas podría ser un string separado por comas
        setFormData((prevData) => ({
          ...prevData,
          coverageAreas: value.split(",").map((area) => area.trim()),
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resourceId = userInfo?._id;
      if (!resourceId) throw new Error("No se encontró el recurso asociado.");

      let url = "";
      switch (role) {
        case "agricultor":
          url = `https://hackaton-back-production.up.railway.app/peasant/${resourceId}`;
          break;
        case "proveedor":
          url = `https://hackaton-back-production.up.railway.app/supplier/${resourceId}`;
          break;
        case "empresa turistica":
          url = `https://hackaton-back-production.up.railway.app/company/${resourceId}`;
          break;
        default:
          throw new Error("Rol no reconocido");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      await axios.put(url, formData, { headers, withCredentials: true });
      Swal.fire("Éxito", "Los datos se actualizaron correctamente.", "success");
      window.location.reload();
    } catch (err) {
      Swal.fire("Error", `No se pudieron actualizar los datos: ${err.message}`, "error");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Cargando...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

  return (
      <div className="p-6 max-w-4xl mx-auto min-h-screen bg-gray-50">
        <nav className="mb-6 border-b">
          <ul className="flex space-x-4 justify-center">
            <li
                onClick={() => setSelectedTab("informacion")}
                className={`cursor-pointer pb-2 border-b-2 transition-colors duration-300 ${
                    selectedTab === "informacion"
                        ? "border-blue-600 text-blue-600 font-bold"
                        : "border-transparent text-gray-600 hover:text-blue-500"
                }`}
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Información
            </li>
            <li
                onClick={() => setSelectedTab("editar")}
                className={`cursor-pointer pb-2 border-b-2 transition-colors duration-300 ${
                    selectedTab === "editar"
                        ? "border-blue-600 text-blue-600 font-bold"
                        : "border-transparent text-gray-600 hover:text-blue-500"
                }`}
            >
              <FontAwesomeIcon icon={faPen} className="mr-2" />
              Editar
            </li>
          </ul>
        </nav>

        {selectedTab === "informacion" && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-gray-800">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Detalles del Perfil
              </h2>
              {role === "agricultor" && userInfo && <UserInfoDisplay role={role} data={userInfo} />}
              {role === "proveedor" && userInfo && <UserInfoDisplay role={role} data={userInfo} />}
              {role === "empresa turistica" && userInfo && <UserInfoDisplay role={role} data={userInfo} />}
            </div>
        )}

        {selectedTab === "editar" && (
            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                <FontAwesomeIcon icon={faPen} className="mr-2" />
                Editar Perfil
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">

                {role === "empresa turistica" && (
                    <>
                      <div>
                        <label className="block text-gray-600 flex items-center space-x-2">
                          <FontAwesomeIcon icon={faBuilding} />
                          <span>Nombre de la Empresa</span>
                        </label>
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName || ""}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Ingrese el nombre de la empresa"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 flex items-center space-x-2">
                          <FontAwesomeIcon icon={faIdCard} />
                          <span>NIT</span>
                        </label>
                        <input
                            type="text"
                            name="nit"
                            value={formData.nit || ""}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Ingrese el NIT"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 flex items-center space-x-2">
                          <FontAwesomeIcon icon={faPhone} />
                          <span>Contacto</span>
                        </label>
                        <input
                            type="text"
                            name="contact"
                            value={formData.contact || ""}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Número de contacto"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 flex items-center space-x-2">
                          <FontAwesomeIcon icon={faRoad} />
                          <span>Dirección</span>
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address || ""}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Dirección física"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 flex items-center space-x-2">
                          <FontAwesomeIcon icon={faLocationArrow} />
                          <span>Latitud</span>
                        </label>
                        <input
                            type="number"
                            name="ubication.latitude"
                            value={formData.ubication?.latitude || ""}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Latitud"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 flex items-center space-x-2">
                          <FontAwesomeIcon icon={faLocationArrow} />
                          <span>Longitud</span>
                        </label>
                        <input
                            type="number"
                            name="ubication.longitude"
                            value={formData.ubication?.longitude || ""}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Longitud"
                        />
                      </div>
                    </>
                )}

                {role === "agricultor" && (
                    <>
                      <div>
                        <label className="block text-gray-600 flex items-center space-x-2">
                          <FontAwesomeIcon icon={faLeaf} />
                          <span>Nombre de la Finca</span>
                        </label>
                        <input
                            type="text"
                            name="farmName"
                            value={formData.farmName || ""}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Ingrese el nombre de la finca"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 flex items-center space-x-2">
                          <FontAwesomeIcon icon={faPhone} />
                          <span>Contacto</span>
                        </label>
                        <input
                            type="text"
                            name="contact"
                            value={formData.contact || ""}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Número de contacto"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 flex items-center space-x-2">
                          <FontAwesomeIcon icon={faRoad} />
                          <span>Dirección</span>
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address || ""}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Dirección"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 flex items-center space-x-2">
                          <FontAwesomeIcon icon={faLocationArrow} />
                          <span>Latitud</span>
                        </label>
                        <input
                            type="number"
                            name="ubication.latitude"
                            value={formData.ubication?.latitude || ""}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Latitud"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 flex items-center space-x-2">
                          <FontAwesomeIcon icon={faLocationArrow} />
                          <span>Longitud</span>
                        </label>
                        <input
                            type="number"
                            name="ubication.longitude"
                            value={formData.ubication?.longitude || ""}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Longitud"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-600 flex items-center space-x-2 mt-4">
                          <FontAwesomeIcon icon={faBox} />
                          <span>Productos</span>
                        </label>
                        {formData.products?.map((product, index) => (
                            <div key={index} className="flex space-x-2 mt-2">
                              <input
                                  type="text"
                                  name={`products.${index}.name`}
                                  value={product.name || ""}
                                  onChange={handleFormChange}
                                  placeholder="Nombre del producto"
                                  className="w-1/2 px-2 py-1 border border-gray-300 rounded-lg"
                              />
                              <input
                                  type="number"
                                  name={`products.${index}.productionQuantity`}
                                  value={product.productionQuantity || ""}
                                  onChange={handleFormChange}
                                  placeholder="Cantidad (libras)"
                                  className="w-1/2 px-2 py-1 border border-gray-300 rounded-lg"
                              />
                            </div>
                        ))}
                      </div>
                    </>
                )}

                {role === "proveedor" && (
                    <>
                      <div>
                        <label className="block text-gray-600 flex items-center space-x-2">
                          <FontAwesomeIcon icon={faWarehouse} />
                          <span>Nombre del Proveedor</span>
                        </label>
                        <input
                            type="text"
                            name="supplierName"
                            value={formData.supplierName || ""}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Nombre del proveedor"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 flex items-center space-x-2">
                          <FontAwesomeIcon icon={faIdCard} />
                          <span>NIT</span>
                        </label>
                        <input
                            type="text"
                            name="nit"
                            value={formData.nit || ""}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="NIT"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 flex items-center space-x-2">
                          <FontAwesomeIcon icon={faPhone} />
                          <span>Contacto</span>
                        </label>
                        <input
                            type="text"
                            name="contactPhone"
                            value={formData.contactPhone || ""}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Teléfono de contacto"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 flex items-center space-x-2">
                          <FontAwesomeIcon icon={faRoad} />
                          <span>Dirección</span>
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address || ""}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Dirección"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 flex items-center space-x-2">
                          <FontAwesomeIcon icon={faLocationArrow} />
                          <span>Latitud</span>
                        </label>
                        <input
                            type="number"
                            name="ubication.latitude"
                            value={formData.ubication?.latitude || ""}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Latitud"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 flex items-center space-x-2">
                          <FontAwesomeIcon icon={faLocationArrow} />
                          <span>Longitud</span>
                        </label>
                        <input
                            type="number"
                            name="ubication.longitude"
                            value={formData.ubication?.longitude || ""}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Longitud"
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-gray-600 flex items-center space-x-2">
                          <FontAwesomeIcon icon={faBox} />
                          <span>Productos Ofrecidos</span>
                        </label>
                        {formData.productsOffered?.map((product, index) => (
                            <div key={index} className="flex space-x-2 mt-2">
                              <input
                                  type="text"
                                  name={`productsOffered.${index}.name`}
                                  value={product.name || ""}
                                  onChange={handleFormChange}
                                  placeholder="Producto"
                                  className="w-1/3 px-2 py-1 border border-gray-300 rounded-lg"
                              />
                              <input
                                  type="number"
                                  name={`productsOffered.${index}.price`}
                                  value={product.price || ""}
                                  onChange={handleFormChange}
                                  placeholder="Precio"
                                  className="w-1/3 px-2 py-1 border border-gray-300 rounded-lg"
                              />
                              <input
                                  type="number"
                                  name={`productsOffered.${index}.quantity`}
                                  value={product.quantity || ""}
                                  onChange={handleFormChange}
                                  placeholder="Cantidad"
                                  className="w-1/3 px-2 py-1 border border-gray-300 rounded-lg"
                              />
                            </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="transportAvailability"
                            checked={formData.transportAvailability || false}
                            onChange={handleFormChange}
                            className="h-4 w-4"
                        />
                        <label className="text-gray-600 flex items-center space-x-2">
                          <FontAwesomeIcon icon={faCheckSquare} />
                          <span>Disponibilidad de transporte</span>
                        </label>
                      </div>
                      <div className="mt-4">
                        <label className="block text-gray-600 flex items-center space-x-2">
                          <FontAwesomeIcon icon={faRoad} />
                          <span>Áreas Cubiertas (sep. por comas)</span>
                        </label>
                        <input
                            type="text"
                            name="coverageAreas"
                            value={formData.coverageAreas?.join(", ") || ""}
                            onChange={handleFormChange}
                            placeholder="Ej: Bogotá, Medellín, Cali"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </>
                )}

                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
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
