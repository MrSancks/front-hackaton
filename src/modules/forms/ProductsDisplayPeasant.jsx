// src/components/ProductsDisplayPeasant.js

import React from 'react';

const ProductsDisplayPeasant = ({ supplier, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 sm:w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold">{supplier.supplierName} - Productos</h3>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 font-semibold"
          >
            X
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {supplier.productsOffered.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300"
            >
              <h4 className="font-semibold text-lg">{product.name}</h4>
              <p><strong>Precio:</strong> ${product.price}</p>
              <p><strong>Descripción:</strong> {product.description || 'No disponible'}</p>
              <a
                href={`https://wa.me/57${supplier.contactPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                Contactar vía WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsDisplayPeasant;