import React from 'react';

const Proveedores = ({ suppliers, handleOpenModal }) => (
  <div>
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Proveedores</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {suppliers.map((supplier) => (
        <div
          key={supplier._id}
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300"
        >
          <h3 className="text-xl font-bold text-gray-800">{supplier.supplierName}</h3>
          <p className="text-gray-600">NIT: {supplier.nit}</p>
          <p className="text-gray-600">Teléfono: {supplier.contactPhone}</p>
          <p className="text-gray-600">Dirección: {supplier.address}</p>
          <p className="text-gray-600">
            Transportes Disponibles: {supplier.transportAvailability ? 'Sí' : 'No'}
          </p>
          <button
            onClick={() => handleOpenModal(supplier)}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 transition"
          >
            Ver Productos
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default Proveedores;
