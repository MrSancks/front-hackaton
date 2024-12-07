import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CompanyModal from '../forms/CompanyModal';
import ProductsDisplayPeasant from '../forms/ProductsDisplayPeasant';  // Importa el modal

const ProveedorDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [peasants, setPeasants] = useState([]);
  const [error, setError] = useState('');
  const [selectedTab, setSelectedTab] = useState('productos'); // 'productos' por defecto
  const [selectedSupplier, setSelectedSupplier] = useState(null);  // Almacena el proveedor seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false);  // Controla la apertura del modal
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const headers = { 'Content-Type': 'application/json' };

    // Recuperar los datos de la cookie
    const userInfoCookie = Cookies.get('token');
    if (!userInfoCookie) {
      navigate('/login'); // Si no está autenticado, redirige a Login
    } else {
      try {
        // Aquí podrías decodificar el token si fuera necesario
      } catch (err) {
        console.error('Error al decodificar el token:', err);
        navigate('/login'); // Si el token no es válido, redirige a Login
      }
    }

    const fetchData = async () => {
      try {
        const baseURL = 'https://hackaton-back-production.up.railway.app';

        // Obtener empresas
        const companyResponse = await axios.get(`${baseURL}/companies`, {
          headers,
          withCredentials: true,
        });
        setCompanies(companyResponse.data.data);

        // Obtener proveedores
        const supplierResponse = await axios.get(`${baseURL}/suppliers`, {
          headers,
          withCredentials: true,
        });
        setSuppliers(supplierResponse.data.data);

        // Obtener agricultores
        const peasantsResponse = await axios.get(`${baseURL}/peasants`, {
          headers,
          withCredentials: true,
        });
        setPeasants(peasantsResponse.data.data);

      } catch (err) {
        setError('Error al obtener los datos: ' + err.message);
      }
    };

    fetchData();
  }, [navigate]);

  // Función para abrir el modal con los productos del proveedor
  const handleOpenModal = (supplier) => {
    setSelectedSupplier(supplier);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSupplier(null);
  };

  return (
    <div className="flex min-h-screen">
      {/* Barra lateral */}
      <div className="w-1/5 border-r-2 border-gray-200 text-black p-4 shadow">
        <h2 className="text-xl font-bold mb-4">Menú</h2>
        <ul className="border-2 border-gray-200">
          <li
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 border-b-2 border-gray-200 ${selectedTab === 'productos' ? 'bg-gray-300' : ''}`}
            onClick={() => setSelectedTab('productos')}
          >
            Productos
          </li>
          <li
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 border-b-2 border-gray-200 ${selectedTab === 'agricultores' ? 'bg-gray-300' : ''}`}
            onClick={() => setSelectedTab('agricultores')}
          >
            Agricultores
          </li>
          <li
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 border-b-2 border-gray-200 ${selectedTab === 'proveedores' ? 'bg-gray-300' : ''}`}
            onClick={() => setSelectedTab('proveedores')}
          >
            Proveedores
          </li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="w-4/5 p-6 mt-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8" data-aos="fade-up">Dashboard Proveedor</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Mostrar productos */}
        {selectedTab === 'productos' && (
          <div data-aos="fade-left" className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Registro</h2>
            <CompanyModal />
          </div>
        )}

        {/* Mostrar agricultores */}
        {selectedTab === 'agricultores' && (
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
        )}

        {/* Mostrar proveedores */}
        {selectedTab === 'proveedores' && suppliers.length > 0 && (
          <div data-aos="fade-right">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Proveedores</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {suppliers.map((supplier) => (
                <div
                  key={supplier._id}
                  className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300 hover:border-2 hover:border-red-500"
                >
                  <h3 className="text-xl font-bold text-gray-800">{supplier.supplierName}</h3>
                  <p><strong>NIT:</strong> {supplier.nit}</p>
                  <p><strong>Teléfono:</strong> {supplier.contactPhone}</p>
                  <p><strong>Dirección:</strong> {supplier.address}</p>
                  <p><strong>Transportes Disponibles:</strong> {supplier.transportAvailability ? 'Sí' : 'No'}</p>
                  <p><strong>Áreas de Cobertura:</strong> {supplier.coverageAreas.join(', ')}</p>

                  {/* Botón para abrir el modal con los productos */}
                  <button
                    onClick={() => handleOpenModal(supplier)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Ver Productos
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal de productos */}
      {selectedSupplier && (
        <ProductsDisplayPeasant
          supplier={selectedSupplier}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProveedorDashboard;
