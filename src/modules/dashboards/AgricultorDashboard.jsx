// src/pages/AgricultorDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Importar js-cookie
import AOS from 'aos';
import 'aos/dist/aos.css';
import {RegistrationForm} from "../pages/savePeasant"

const AgricultorDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [peasants, setPeasants] = useState([]);
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState(null);  // Estado para guardar los datos de userInfo
  const navigate = useNavigate();
  console.log("hola")
  useEffect(() => {
    AOS.init({ duration: 1000 });
    
    const headers = { 'Content-Type': 'application/json' };

    // Recuperar los datos de la cookie
    const userInfoCookie = Cookies.get('token');
    if (!userInfoCookie) {
      navigate('/login'); // Si no está autenticado, redirige a Login
    } else {
      //setUserInfo(JSON.parse(userInfoCookie));  // Parsear y guardar el userInfo desde la cookie
    }

    const fetchData = async () => {
      try {
        const baseURL = 'https://hackaton-back-production.up.railway.app';
        //const baseURL = 'http://localhost:3000';

        // Obtener empresas
        const companyResponse = await axios.get(`${baseURL}/companies`, {
          headers,
          withCredentials: true,
        });
        setCompanies(companyResponse.data.data);

        // Obtener campesinos (En este caso, su información relevante para el agricultor)
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

  const sessionCookie = Cookies.get('session');
  console.log('Contenido de la cookie session 1:', sessionCookie);

  return (
    <div className="container mx-auto p-6 mt-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8" data-aos="fade-up">Dashboard Agricultor</h1>
      <RegistrationForm></RegistrationForm>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Mostrar los datos de userInfo */}
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Empresas</h2>
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

      {/* Mostrar campesinos */}
      {peasants.length > 0 ? (
        <div data-aos="fade-right">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Campesinos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {peasants.map((peasant) => (
              <div
                key={peasant._id}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-gray-800">{peasant.farmName}</h3>
                <p><strong>Ubicación:</strong> {peasant.ubication.latitude}, {peasant.ubication.longitude}</p>
                <p><strong>Productos:</strong></p>
                <ul className="ml-4">
                  {peasant.products.map((product) => (
                    <li key={product._id} className="text-gray-600">
                      <p><strong>{product.name}:</strong> {product.productionQuantity} unidades</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-600">No se pudieron cargar los datos de campesinos.</p>
      )}
    </div>
  );
};

export default AgricultorDashboard;
