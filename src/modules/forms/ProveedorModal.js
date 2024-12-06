import React from 'react';

const ProveedorModal = ({ formData, handleChange, handleSubmit, handleCloseModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Formulario de Proveedor</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre del Proveedor</label>
            <input
              type="text"
              name="supplierName"
              value={formData.supplierName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">NIT</label>
            <input
              type="text"
              name="nit"
              value={formData.nit}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Teléfono de Contacto</label>
            <input
              type="text"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Dirección</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Áreas de Cobertura (separadas por comas)</label>
            <input
              type="text"
              name="coverageAreas"
              value={formData.coverageAreas.join(', ')}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Ejemplo: Villavicencio, Acacías"
            />
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center text-gray-700">
              <input
                type="checkbox"
                name="transportAvailability"
                checked={formData.transportAvailability}
                onChange={(e) => handleChange(e)}
                className="mr-2"
              />
              ¿Disponibilidad de transporte?
            </label>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCloseModal}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-4"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Guardar Proveedor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProveedorModal;
