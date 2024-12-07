import React from 'react';

const Empresas = ({ companies }) => (
  <div data-aos="fade-left" className="mb-12">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Empresas Asociadas</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.length > 0 ? (
        companies.map((company) => (
          <div
            key={company._id}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300 hover:border-2 hover:border-red-500"
          >
            <h3 className="text-xl font-bold text-gray-800">{company.companyName}</h3>
            <p><strong>NIT:</strong> {company.nit}</p>
            <p><strong>Contacto:</strong> {company.contact}</p>
            <a
              href={`https://wa.me/57${company.contact}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300 mt-4"
            >
              Enviar mensaje
            </a>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No se pudieron cargar los datos de empresas.</p>
      )}
    </div>
  </div>
);

export default Empresas;
