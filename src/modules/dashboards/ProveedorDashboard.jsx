import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProveedorModal from '../forms/ProveedorModal';

const ProveedorDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [peasants, setPeasants] = useState([]); // Estado para los agricultores
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [selectedTab, setSelectedTab] = useState('productos');
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const headers = { 'Content-Type': 'application/json' };

    // Recuperar los datos de la cookie
    const userInfoCookie = Cookies.get('token');
    if (!userInfoCookie) {
      navigate('/login');
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
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 border-b-2 border-gray-200 ${selectedTab === 'empresas' ? 'bg-gray-300' : ''}`}
            onClick={() => setSelectedTab('empresas')}
          >
            Empresas Asociadas
          </li>
          <li
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 border-b-2 border-gray-200 ${selectedTab === 'agricultores' ? 'bg-gray-300' : ''}`}
            onClick={() => setSelectedTab('agricultores')}
          >
            Agricultores
          </li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="w-4/5 p-6 mt-12">
        {error && <p className="text-red-500 text-center my-4">{error}</p>}

        {selectedTab === 'productos' && (
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-9" data-aos="fade-left">
              Dashboard Proveedor
            </h1>
            <p className="text-center text-gray-800 mb-8">Aquí encontrarás las empresas y agricultores del Meta que requieran algún producto que puedas ofrecer.</p>
            <ProveedorModal></ProveedorModal>
          </div>
        )}

        {selectedTab === 'empresas' && (
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
        )}

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
      </div>
    </div>
  );
};

export default ProveedorDashboard;
