import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import OfferButton from "./OfferButton";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export const ViewRequest = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [requestTypeFilter, setRequestTypeFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
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

    fetchRequests();
  }, [token]);

  useEffect(() => {
    const applyFilters = () => {
      let filteredData = [...requests];
      if (statusFilter) {
        filteredData = filteredData.filter((request) => request.status === statusFilter);
      }
      if (requestTypeFilter) {
        filteredData = filteredData.filter((request) => request.requestType === requestTypeFilter);
      }
      if (roleFilter) {
        filteredData = filteredData.filter((request) => request.user.role === roleFilter);
      }
      setFilteredRequests(filteredData);
    };

    applyFilters();
  }, [statusFilter, requestTypeFilter, roleFilter, requests]);

  const openModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === "backdrop") closeModal();
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
          <div className="spinner-border animate-spin border-4 rounded-full border-t-4 border-green-500 w-16 h-16"></div>
        </div>
    );
  }

  return (
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Solicitudes Recibidas</h2>

        {/* Modern Filter Section */}
        <div className="flex flex-wrap justify-between items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faFilter} className="text-gray-500" />
            <span className="text-gray-600 font-semibold">Filtrar por:</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Estado</option>
              <option value="activa">Activa</option>
              <option value="inactiva">Inactiva</option>
            </select>

            <select
                value={requestTypeFilter}
                onChange={(e) => setRequestTypeFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tipo de Solicitud</option>
              <option value="compra">Compra</option>
              <option value="venta">Venta</option>
            </select>

            <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Rol</option>
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
                    <p className="text-gray-600">
                      <strong>Tipo de Solicitud:</strong> {request.requestType}
                    </p>
                    <p className="text-gray-600">
                      <strong>Cantidad:</strong> {request.product.quantity}
                    </p>
                    <p className="text-gray-600">
                      <strong>Precio:</strong> ${request.product.price}
                    </p>
                    <p className="text-gray-600">
                      <strong>Descripción:</strong> {request.description || "Sin descripción"}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-gray-600 text-sm">
              <span>
                <strong>Solicitante:</strong> {request.user.name} ({request.user.email})
              </span>
                    <span>
                <strong>Fecha de Solicitud:</strong>{" "}
                      {new Date(request.createdAt).toLocaleString()}
              </span>
                  </div>
                  <button
                      onClick={() => openModal(request)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 transition"
                  >
                    Hacer Oferta
                  </button>
                </div>
            ))
        )}

        {isModalOpen && selectedRequest && (
            <div
                id="backdrop"
                className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-start pt-10 z-50"
                onClick={handleBackdropClick}
            >
              <div className="bg-white p-6 rounded-lg max-w-md w-full relative shadow-lg">
                <button
                    onClick={closeModal}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                  &times;
                </button>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Hacer Oferta</h3>
                <OfferButton requestId={selectedRequest._id} userId={decodetoken.id} />
              </div>
            </div>
        )}
      </div>
  );
};

export default ViewRequest;
