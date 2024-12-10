import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import OfferButton from "./OfferButton";
import { jwtDecode } from "jwt-decode";

export const ViewRequest = (latitude, longitude, radiusKm) => {
  const [requests, setRequests] = useState([]); // All requests
  const [filteredRequests, setFilteredRequests] = useState([]); // Filtered requests
  const [loading, setLoading] = useState(true); // Loading state
  const [statusFilter, setStatusFilter] = useState(""); // Filter by status
  const [requestTypeFilter, setRequestTypeFilter] = useState(""); // Filter by request type
  const [roleFilter, setRoleFilter] = useState(""); // Filter by user role
  const [distanceFilter, setDistanceFilter] = useState(10000); // Default distance filter is 10000 km
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [selectedRequest, setSelectedRequest] = useState(null); // Store selected request
  const token = document.cookie;
  const decodetoken = jwtDecode(token);
  console.log(decodetoken)
  // Get user location based on role
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
  
      console.log("User location response:", response.data.data);
  
      // Validar y retornar coordenadas
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
  
  // Fetch filtered requests using the location
  const fetchFilteredRequests = async (latitude, longitude, radiusKm) => {
    if (!latitude || !longitude || !radiusKm || isNaN(radiusKm)) {
      console.error("Latitude, Longitude, or Distance is invalid. Cannot fetch requests.");
      return;
    }
  
    try {
      const url = `https://hackaton-back-production.up.railway.app/requests/filter/location?latitude=${latitude}&longitude=${longitude}&radiusKm=${radiusKm}`;
      console.log("Fetching requests with URL:", url);
  
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
  
      if (Array.isArray(response.data.data)) {
        setRequests(response.data.data);
        setFilteredRequests(response.data.data);
        console.log(response.data.data);
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
        console.log("User location fetched:", userLocation);
        // Ensure radius is a valid number
        if (distanceFilter && !isNaN(distanceFilter)) {
          fetchFilteredRequests(userLocation.latitude, userLocation.longitude, distanceFilter);
        } else {
          console.error("Invalid distance filter:", distanceFilter);
          setFilteredRequests([]); // Optionally show no results or some fallback UI
        }
      } else {
        console.error("No user location found. Cannot fetch requests.");
      }
    };
  
    fetchData();
  }, [token, distanceFilter]);
  

  // Function to open the modal and set the selected request
  const openModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };
  console.log(selectedRequest)


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin border-4 rounded-full border-t-4 border-green-500 w-16 h-16"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Solicitudes Recibidas</h2>

      {/* Filter Controls */}
      <div className="flex justify-between space-x-4 mb-6">
        <div>
          <label className="mr-2 text-gray-600">Estado:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Todos</option>
            <option value="activa">Activa</option>
            <option value="inactiva">Inactiva</option>
          </select>
        </div>

        <div>
          <label className="mr-2 text-gray-600">Tipo de Solicitud:</label>
          <select
            value={requestTypeFilter}
            onChange={(e) => setRequestTypeFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Todos</option>
            <option value="compra">Compra</option>
            <option value="venta">Venta</option>
          </select>
        </div>

        <div>
          <label className="mr-2 text-gray-600">Rol:</label>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Todos</option>
            <option value="agricultor">Agricultor</option>
            <option value="proveedor">Proveedor</option>
          </select>
        </div>

        {/* Distance filter with text input and button */}
        <div>
          <label className="mr-2 text-gray-600">Distancia (km):</label>
          <input
            type="text"
            value={distanceFilter}
            onChange={(e) => setDistanceFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded w-20"
            placeholder="Ej. 10000"
          />
          
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="spinner-border animate-spin border-4 rounded-full border-t-4 border-green-500 w-16 h-16"></div>
        </div>
      ) : filteredRequests.length === 0 ? (
        <p className="text-center text-gray-600">No hay solicitudes disponibles.</p>
      ) : (
        filteredRequests.map((request) => {
          const isPurchase = request.request.requestType === "compra"; // Verifica si es una compra
          const containerBgClass = isPurchase ? "bg-green-100" : "bg-red-100";

          return (
            <div
              key={request._id}
              className={`border-b border-gray-300 py-4 space-y-4 p-4 rounded-lg ${containerBgClass}`}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  {request.request.product.name}
                </h3>
                <span
                  className={`text-sm font-medium px-2 py-1 rounded-lg ${
                    request.status === "activa"
                      ? "bg-red-500 text-green-600"
                      : "bg-green-500 text-red-600"
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

              {/* Botón para abrir el modal */}
              <button
                onClick={() => openModal(request.request)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
              >
                Hacer Oferta
              </button>
            </div>
          );
        })
      )}

      {/* Modal para el botón de oferta */}
      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-start pt-[50px] z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800">Hacer Oferta</h3>
            <OfferButton requestId={selectedRequest._id} userId={decodetoken.id} />
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ViewRequest;
