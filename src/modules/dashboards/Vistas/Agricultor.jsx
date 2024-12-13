import React from "react";
import { SunIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"; // Para WhatsApp
import {faMapMarkerAlt, faPhone, faTrash} from "@fortawesome/free-solid-svg-icons"; // Para llamada
import axios from "axios";

const Agricultores = ({ peasants, handleOpenModal, refreshSuppliers }) => {
    const normalizeContact = (contact) => {
        if (!contact) return null;
        const sanitized = contact.replace(/\D+/g, "");
        return sanitized.startsWith("57") ? sanitized : `57${sanitized}`;
    };

    const isValidCellNumber = (contact) => {
        const cellRegex = /^57\d{10}$/;
        return cellRegex.test(contact);
    };

    const renderContactButtons = (contact) => {
        const normalizedContact = normalizeContact(contact);
        if (!normalizedContact) return null;

        const isCell = isValidCellNumber(normalizedContact);

        return (
            <div className="flex justify-center space-x-4 mt-4">
                {isCell && (
                    <a
                        href={`https://wa.me/${normalizedContact}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                    >
                        <FontAwesomeIcon icon={faWhatsapp} className="text-lg" />
                        <span>WhatsApp</span>
                    </a>
                )}
                <a
                    href={`tel:${normalizedContact}`}
                    className="flex items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                >
                    <FontAwesomeIcon icon={faPhone} className="text-lg" />
                    <span>Llamar</span>
                </a>
            </div>
        );
    };

    const deletePeasant = async (peasantId) => {
        try {
            const response = await axios.delete(
                `https://hackaton-back-production.up.railway.app/peasant/${peasantId}`,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                alert("Agricultor eliminado exitosamente.");
                if (refreshSuppliers) refreshSuppliers();
                window.location.reload();
            } else {
                alert("Error al eliminar el agricultor.");
            }
        } catch (error) {
            console.error("Error al eliminar agricultor:", error);
            alert("Hubo un problema al intentar eliminar el agricultor.");
        }
    };

    return (
        <div data-aos="fade-left">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Agricultores</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {peasants.length > 0 ? (
                    peasants.map((peasant, index) => (
                        <div
                            key={peasant._id}
                            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="flex items-center mb-4">
                                <SunIcon className="h-8 w-8 text-green-600 mr-2"/>
                                <h3 className="text-lg font-semibold text-green-600">
                                    {peasant.farmName}
                                </h3>
                            </div>
                            <p>
                                <strong>Contacto:</strong> {peasant.contact || "No disponible"}
                            </p>
                            <p>
                                <strong>Dirección:</strong> {peasant.address || "No disponible"}
                            </p>
                            <p>
                                <strong>Ubicación:</strong>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="ml-2"/>
                                Lat: {peasant.ubication.latitude.toFixed(3)},
                                Lng: {peasant.ubication.longitude.toFixed(3)}
                            </p>
                            <p>
                                <strong>Usuario Asociado:</strong>{" "}
                                {peasant.user?.name || "Información no disponible"}
                            </p>
                            <p>
                                <strong>Correo:</strong>{" "}
                                {peasant.user?.email || "Información no disponible"}
                            </p>
                            {peasant.products?.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="text-lg font-semibold text-gray-700">Productos</h4>
                                    <ul className="list-disc list-inside text-sm text-gray-600">
                                        {peasant.products.map((product, idx) => (
                                            <li key={idx}>
                                                {product.name} - {product.productionQuantity} libras
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {renderContactButtons(peasant.contact)}
                            {peasant.products?.length > 0 && (
                                <div className="flex justify-center mt-4">
                                    <button
                                        onClick={() => handleOpenModal(peasant)}
                                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                                    >
                                        Ver Productos
                                    </button>
                                </div>
                            )}
                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={() => deletePeasant(peasant._id)}
                                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
                                >
                                    <FontAwesomeIcon icon={faTrash} className="mr-2"/>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">
                        No se pudieron cargar los datos de agricultores.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Agricultores;
