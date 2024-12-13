import React from 'react';
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'; // Para WhatsApp
import { faPhone, faTrash, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'; // Para llamada
import axios from "axios";

const Empresas = ({ companies, handleOpenModal, refreshCompanies }) => {
    const normalizeContact = (contact) => {
        if (!contact) return null;
        const sanitized = contact.replace(/\D+/g, ""); // Quitar todo lo que no sea número
        return sanitized.startsWith("57") ? sanitized : `57${sanitized}`; // Agregar prefijo si falta
    };

    const isValidCellNumber = (contact) => {
        const cellRegex = /^57\d{10}$/; // Validar que comience con 57 y tenga 10 dígitos después
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

    const deleteCompany = async (companyId) => {
        try {
            const response = await axios.delete(
                `https://hackaton-back-production.up.railway.app/company/${companyId}`,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                alert("Empresa eliminada exitosamente.");
                if (refreshCompanies) refreshCompanies();
                window.location.reload();
            } else {
                alert("Error al eliminar la empresa.");
            }
        } catch (error) {
            console.error("Error al eliminar empresa:", error);
            alert("Hubo un problema al intentar eliminar la empresa.");
        }
    };

    return (
        <div data-aos="fade-left" className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Empresas Turísticas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.length > 0 ? (
                    companies.map((company, index) => (
                        <div
                            key={company._id}
                            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
                            data-aos="fade-up"
                            data-aos-delay={index * 100} // Retardo para escalonar la aparición
                        >
                            <div className="flex items-center mb-4">
                                <BuildingOffice2Icon className="h-8 w-8 text-gray-600 mr-2" />
                                <h3 className="text-lg font-semibold text-blue-600">
                                    {company.companyName}
                                </h3>
                            </div>
                            <p>
                                <strong>NIT:</strong> {company.nit}
                            </p>
                            <p>
                                <strong>Contacto:</strong> {company.contact}
                            </p>
                            <p>
                                <strong>Dirección:</strong> {company.address || "No disponible"}
                            </p>
                            <p>
                                <strong>Ubicación:</strong>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="ml-2" />
                                Lat: {company.ubication.latitude.toFixed(3)},
                                Lng: {company.ubication.longitude.toFixed(3)}
                            </p>
                            <p>
                                <strong>Usuario Asociado:</strong>
                                {company.user?.name || "Información no disponible"}
                            </p>
                            <p>
                                <strong>Correo:</strong>
                                {company.user?.email || "Información no disponible"}
                            </p>
                            {renderContactButtons(company.contact)}
                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={() => deleteCompany(company._id)}
                                    className="flex items-center space-x-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                                >
                                    <FontAwesomeIcon icon={faTrash} className="text-lg" />
                                    <span>Eliminar</span>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No se pudieron cargar los datos de empresas.</p>
                )}
            </div>
        </div>
    );
};

export default Empresas;
