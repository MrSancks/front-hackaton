import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import OfferButton from "./OfferButton";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faShoppingCart,
  faUser,
  faMapMarkerAlt,
  faSlidersH,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

export const ViewRequest = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [requestTypeFilter, setRequestTypeFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [distanceFilter, setDistanceFilter] = useState(10000);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const token = document.cookie;
  const decodetoken = jwtDecode(token);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const fetchUserLocation = async () => {
    let url = "";

    if (decodetoken.role === "agricultor") {
      url = `https://hackaton-back-production.up.railway.app/peasant/user/${decodetoken.id}`;
    } else if (decodetoken.role === "proveedor") {
      url = `https://hackaton-back-production.up.railway.app/suppliers/user/${decodetoken.id}`;
    } else if (decodetoken.role === "empresa turistica") {
      url = `https://hackaton-back-production.up.railway.app/company/user/${decodetoken.id}`;
    }

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.data && response.data.data && response.data.data.ubication) {
        return response.data.data.ubication;
      } else {
        console.error("Ubicación no encontrada en la respuesta.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user location:", error);
      return null;
    }
  };

  const fetchFilteredRequests = async (latitude, longitude, radiusKm) => {
    if (!latitude || !longitude || !radiusKm || isNaN(radiusKm)) {
      console.error("Latitude, Longitude, or Distance is invalid. Cannot fetch requests.");
      return;
    }

    try {
      const url = `https://hackaton-back-production.up.railway.app/requests/filter/location?latitude=${latitude}&longitude=${longitude}&radiusKm=${radiusKm}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (Array.isArray(response.data.data)) {
        setRequests(response.data.data);
        setFilteredRequests(response.data.data);
      } else {
        setRequests([]);
        setFilteredRequests([]);
      }
      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar las solicitudes",
        text: "Hubo un problema al obtener las solicitudes. Inténtalo más tarde.",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userLocation = await fetchUserLocation();

      if (userLocation) {
        if (distanceFilter && !isNaN(distanceFilter)) {
          fetchFilteredRequests(userLocation.latitude, userLocation.longitude, distanceFilter);
        } else {
          console.error("Invalid distance filter:", distanceFilter);
          setFilteredRequests([]);
        }
      } else {
        console.error("No user location found. Cannot fetch requests.");
      }
    };

    fetchData();
  }, [token, distanceFilter]);

  useEffect(() => {
    let filteredData = [...requests];

    if (statusFilter) {
      filteredData = filteredData.filter((request) => request.status === statusFilter);
    }

    if (requestTypeFilter) {
      filteredData = filteredData.filter((request) => request.request.requestType === requestTypeFilter);
    }

    if (roleFilter) {
      filteredData = filteredData.filter((request) => request.request.user.role === roleFilter);
    }

    setFilteredRequests(filteredData);
  }, [statusFilter, requestTypeFilter, roleFilter, requests]);

  const openModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };
  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
          <div className="border-4 border-t-4 border-green-500 w-16 h-16 rounded-full animate-spin"></div>
        </div>
    );
  }

  return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Solicitudes Recibidas</h2>

        <div className="flex justify-end mb-4 md:hidden">
          <button
              onClick={openFilterModal}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faSlidersH}/>
            <span>Filtros</span>
          </button>
        </div>

        {/* Contenedor de filtros para desktop */}
        <div className="hidden md:grid grid-cols-2 gap-6 mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
          {/* Estado Filter */}
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faCircle} className="text-blue-500"/>
            <label className="text-gray-600 font-medium">Estado:</label>
            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Todos</option>
              <option value="activa">Activa</option>
              <option value="inactiva">Inactiva</option>
            </select>
          </div>

          {/* Tipo de Solicitud Filter */}
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faShoppingCart} className="text-green-500"/>
            <label className="text-gray-600 font-medium">Tipo:</label>
            <select
                value={requestTypeFilter}
                onChange={(e) => setRequestTypeFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value="">Todos</option>
              <option value="compra">Compra</option>
              <option value="venta">Venta</option>
            </select>
          </div>

          {/* Rol Filter */}
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faUser} className="text-purple-500"/>
            <label className="text-gray-600 font-medium">Rol:</label>
            <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            >
              <option value="">Todos</option>
              <option value="agricultor">Agricultor</option>
              <option value="proveedor">Proveedor</option>
            </select>
          </div>

          {/* Distance Filter */}
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500"/>
            <label className="text-gray-600 font-medium">Distancia (km):</label>
            <input
                type="text"
                value={distanceFilter}
                onChange={(e) => setDistanceFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                placeholder="Ej. 10000"
            />
          </div>
        </div>

        {filteredRequests.length === 0 ? (
            <p className="text-center text-gray-600">No hay solicitudes disponibles.</p>
        ) : (
            filteredRequests.map((request) => {
              const isPurchase = request.request.requestType === "compra";
              const containerBgClass = isPurchase ? "bg-green-50" : "bg-red-50";

              return (
                  <div
                      key={request._id}
                      className={`border-b border-gray-300 py-4 space-y-4 p-4 rounded-lg ${containerBgClass} hover:shadow-md transition`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {request.request.product.name}
                      </h3>
                      <span
                          className={`text-sm font-medium px-2 py-1 rounded-lg ${
                              request.status === "activa"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-200 text-gray-800"
                          }`}
                      >
                  {request.status}
                </span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <strong>Tipo de Solicitud:</strong> {request.request.requestType}
                      </p>
                      <p className="text-gray-600">
                        <strong>Cantidad:</strong> {request.request.product.quantity}
                      </p>
                      <p className="text-gray-600">
                        <strong>Precio:</strong> ${request.request.product.price}
                      </p>
                      <p className="text-gray-600">
                        <strong>Descripción:</strong>{" "}
                        {request.request.description || "Sin descripción"}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-gray-600 text-sm">
                <span>
                  <strong>Solicitante:</strong> {request.request.user.name} (
                  {request.request.user.email})
                </span>
                      <span>
                  <strong>Fecha de Solicitud:</strong>{" "}
                        {new Date(request.request.createdAt).toLocaleString()}
                </span>
                    </div>

                    <button
                        onClick={() => openModal(request.request)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 transition"
                    >
                      Hacer Oferta
                    </button>
                  </div>
              );
            })
        )}

        {/* Modal para el botón de oferta */}
        {isModalOpen && selectedRequest && (
            <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm flex justify-center items-start pt-[50px] z-50">
              <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Hacer Oferta</h3>
                <OfferButton requestId={selectedRequest._id} userId={decodetoken.id}/>
                <button
                    onClick={closeModal}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Cerrar
                </button>
              </div>
            </div>
        )}

        {/* Modal de Filtros en móvil */}
        {isFilterModalOpen && (
            <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50 px-4"
                onClick={closeFilterModal}
            >
              <div
                  className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
                  onClick={(e) => e.stopPropagation()}
              >
                <button
                    onClick={closeFilterModal}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <FontAwesomeIcon icon={faTimes} className="h-5 w-5"/>
                </button>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Filtros</h3>

                <div className="space-y-4">
                  {/* Estado Filter */}
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faCircle} className="text-blue-500"/>
                    <label className="text-gray-600 font-medium">Estado:</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                    >
                      <option value="">Todos</option>
                      <option value="activa">Activa</option>
                      <option value="inactiva">Inactiva</option>
                    </select>
                  </div>

                  {/* Tipo de Solicitud Filter */}
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faShoppingCart} className="text-green-500"/>
                    <label className="text-gray-600 font-medium">Tipo:</label>
                    <select
                        value={requestTypeFilter}
                        onChange={(e) => setRequestTypeFilter(e.target.value)}
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 flex-1"
                    >
                      <option value="">Todos</option>
                      <option value="compra">Compra</option>
                      <option value="venta">Venta</option>
                    </select>
                  </div>

                  {/* Rol Filter */}
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faUser} className="text-purple-500"/>
                    <label className="text-gray-600 font-medium">Rol:</label>
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 flex-1"
                    >
                      <option value="">Todos</option>
                      <option value="agricultor">Agricultor</option>
                      <option value="proveedor">Proveedor</option>
                    </select>
                  </div>

                  {/* Distance Filter */}
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500"/>
                    <label className="text-gray-600 font-medium">Distancia (km):</label>
                    <input
                        type="text"
                        value={distanceFilter}
                        onChange={(e) => setDistanceFilter(e.target.value)}
                        className="p-2 border border-gray-300 rounded w-20 focus:outline-none focus:ring-2 focus:ring-red-500 flex-1"
                        placeholder="Ej. 10000"
                    />
                  </div>
                </div>

                <button
                    onClick={closeFilterModal}
                    className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Aplicar Filtros
                </button>
              </div>
            </div>
        )}
      </div>
  );
};

export default ViewRequest;
