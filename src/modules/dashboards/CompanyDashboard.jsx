// src/pages/ProveedorDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Importar js-cookie
import AOS from 'aos';
import 'aos/dist/aos.css';
import CompanyModal from '../forms/CompanyModal';

const ProveedorDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [suppliers, setSuppliers] = useState([]); // Estado para los proveedores
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState(null);  // Estado para guardar los datos de userInfo
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
        // Decodificar el token JWT para obtener la información del usuario
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

      } catch (err) {
        setError('Error al obtener los datos: ' + err.message);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="container mx-auto p-6 mt-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8" data-aos="fade-up">Dashboard Compañia</h1>

      <CompanyModal></CompanyModal>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {userInfo && (
        <div data-aos="fade-left" className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Información del Usuario</h2>
          <p><strong>Nombre:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Rol:</strong> {userInfo.role}</p>
          <p><strong>ID de Usuario:</strong> {userInfo.id}</p>
          <p><strong>Teléfono:</strong> {userInfo.phone || 'No disponible'}</p>
          <p><strong>Dirección:</strong> {userInfo.address || 'No disponible'}</p>
        </div>
      )}

      {/* Mostrar empresas */}
      {companies.length > 0 ? (
        <div data-aos="fade-left" className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Empresas Asociadas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <div
                key={company._id}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-gray-800">{company.companyName}</h3>
                <p><strong>NIT:</strong> {company.nit}</p>
                <p><strong>Contacto:</strong> {company.contact}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-600">No se pudieron cargar los datos de empresas.</p>
      )}

      {/* Mostrar proveedores */}
      {suppliers.length > 0 ? (
        <div data-aos="fade-right">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Proveedores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {suppliers.map((supplier) => (
              <div
                key={supplier._id}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-gray-800">{supplier.supplierName}</h3>
                <p><strong>NIT:</strong> {supplier.nit}</p>
                <p><strong>Teléfono de Contacto:</strong> {supplier.contactPhone}</p>
                <p><strong>Dirección:</strong> {supplier.address}</p>
                <p><strong>Transportes Disponibles:</strong> {supplier.transportAvailability ? 'Sí' : 'No'}</p>
                <p><strong>Áreas de Cobertura:</strong> {supplier.coverageAreas.join(', ')}</p>
                <p><strong>Productos Ofrecidos:</strong></p>
                
                <ul className="ml-4">
                  {supplier.productsOffered.map((product) => (
                    <li key={product._id} className="text-gray-600">
                      <p><strong>Nombre:</strong> {product.name}</p>
                      <p><strong>Precio:</strong> ${product.price}</p>
                      
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-600">No se pudieron cargar los datos de proveedores.</p>
      )}
    </div>
  );
};

export default ProveedorDashboard;
