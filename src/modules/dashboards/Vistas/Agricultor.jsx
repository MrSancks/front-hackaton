import React from 'react';

const Agricultores = ({ peasants }) => (
  <div data-aos="fade-left">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Agricultores</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {peasants.length > 0 ? (
        peasants.map((peasant) => (
          <div
            key={peasant._id}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300 hover:border-2 hover:border-red-500"
          >
            <h3 className="text-xl font-bold text-gray-800">{peasant.farmName}</h3>
            <p><strong>Latitud:</strong> {peasant.ubication.latitude}</p>
            <p><strong>Longitud:</strong> {peasant.ubication.longitude}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No se pudieron cargar los datos de agricultores.</p>
      )}
    </div>
  </div>
);

export default Agricultores;
