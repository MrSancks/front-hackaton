import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import OfferButton from "./OfferButton";
import { jwtDecode } from "jwt-decode";

export const ViewRequest = () => {
  const [requests, setRequests] = useState([]); // All requests
  const [filteredRequests, setFilteredRequests] = useState([]); // Filtered requests
  const [loading, setLoading] = useState(true); // Loading state
  const [statusFilter, setStatusFilter] = useState(""); // Filter by status
  const [requestTypeFilter, setRequestTypeFilter] = useState(""); // Filter by request type
  const [roleFilter, setRoleFilter] = useState(""); // Filter by user role
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [selectedRequest, setSelectedRequest] = useState(null); // Store selected request
  const token = document.cookie;
  const decodetoken = jwtDecode(token);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "https://hackaton-back-production.up.railway.app/requests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (Array.isArray(response.data.data)) {
          setRequests(response.data.data); // Set all requests
          setFilteredRequests(response.data.data); // Initially set filteredRequests to all requests
        } else {
          console.error("Expected an array in response.data.data but got:", response.data);
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
    console.log()
    fetchRequests();
  }, [token]);

  // Apply filters whenever the filter values change
  useEffect(() => {
    const applyFilters = () => {
      let filteredData = [...requests]; // Create a copy of requests

      if (statusFilter) {
        filteredData = filteredData.filter((request) => request.status === statusFilter);
      }

      if (requestTypeFilter) {
        filteredData = filteredData.filter((request) => request.requestType === requestTypeFilter);
      }

      if (roleFilter) {
        filteredData = filteredData.filter((request) => request.user.role === roleFilter);
      }

      setFilteredRequests(filteredData); // Update the filtered requests
    };

    applyFilters();
  }, [statusFilter, requestTypeFilter, roleFilter, requests]);

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
      </div>

      {filteredRequests.length === 0 ? (
        <p className="text-center text-gray-600">No hay solicitudes disponibles.</p>
      ) : (
        filteredRequests.map((request) => (
          <div key={request._id} className="border-b border-gray-300 py-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">{request.product.name}</h3>
              <span
                className={`text-sm font-medium px-2 py-1 rounded-lg ${
                  request.status === "activa"
                    ? "bg-green-200 text-green-600"
                    : "bg-red-200 text-red-600"
                }`}
              >
                {request.status}
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-gray-600"><strong>Tipo de Solicitud:</strong> {request.requestType}</p>
              <p className="text-gray-600"><strong>Cantidad:</strong> {request.product.quantity}</p>
              <p className="text-gray-600"><strong>Precio:</strong> ${request.product.price}</p>
              <p className="text-gray-600"><strong>Descripción:</strong> {request.description || "Sin descripción"}</p>
            </div>

            <div className="flex justify-between items-center text-gray-600 text-sm">
              <span><strong>Solicitante:</strong> {request.user.name} ({request.user.email})</span>
              <span><strong>Fecha de Solicitud:</strong> {new Date(request.createdAt).toLocaleString()}</span>
            </div>

            {/* Button to open the offer modal */}
            <button
              onClick={() => openModal(request)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            >
              Hacer Oferta
            </button>
          </div>
        ))
      )}

      {/* Modal for OfferButton */}
      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-start pt-[50px] z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800">Hacer Oferta</h3>
            <OfferButton requestId={selectedRequest._id} userId={decodetoken.id} />
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white px-4 py-4 rounded-md"
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
